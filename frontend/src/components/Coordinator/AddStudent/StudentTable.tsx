import { useState , useEffect } from "react";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Button,
  Modal,
  TableTh,
  Tooltip,
  ActionIcon,
  Select,
  Box,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconAt,
  IconUser,
  IconEdit,
  IconTrash,
  IconX,
  IconCheck,
  
} from "@tabler/icons-react";
import classes from "../../../Styles/TableSort.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import CoordinatorAPI from "../../../API/coordinatorAPI/coordinator.api";

interface RowData {
  _id : string;
  name: string;
  email: string;
  company: string;
  regNo: string;
  specialization: string;
  batch: string;
  semester: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}



const StudentDetails = () => {

 //use react query and fetch research data
 const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ["StudentData"],
  queryFn: () =>
    CoordinatorAPI.getAllStudentDetails().then((res) => res.data),
});



  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data ? data : []);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const[editOpened , setEditOpened] = useState(false);
  const[deleteOpen , setDeleteOpen] = useState(false);
  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const IconUserr = <IconUser style={{ width: rem(16), height: rem(16) }} />;

  useEffect(() => {
    if (data) {
      setSortedData(data);
    }
  }, [data]);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };


  const registerStudent = async (values: {
    name: string;
    email: string;
    regNo: string;
    specialization: string;
    batch: string;
    semester : string;
  }) => {
    console.log(values);
    showNotification({
      id: "Add Student",
      loading: true,
      title: "Adding Studnet Record",
      message: "please wait while we add student record..",
      autoClose: false,
    });

    CoordinatorAPI.studentRegister(values).then((Response) => {
      updateNotification({
        id: "Add Student",
        color: "teal",
        title: "Adding Studnet record",
        message: "Please wait while we add Studnet record..",
        icon: <IconCheck />,
        autoClose: 2500,
      });

       registerForm.reset();
      //  open(false);

      // getting updated details from the DB
       refetch();
    });
  };

  //Update Student details
  const updateStudent = async(values:{
    _id :string;
    name: string;
    email: string;
    regNo: string;
    specialization: string;
    batch: string;
    semester : string;
  }) =>{
    console.log(values)
    showNotification({
      id: "update-Student",
      loading: true,
      title: "Updating Student record",
      message: "Please wait while we update record..",
      autoClose: false,
    });
    CoordinatorAPI.updateStudentDetails(values)
      .then((response) => {
        updateNotification({
          id: "update-Member",
          color: "teal",
          icon: <IconCheck />,
          title: "Member updated successfully",
          message: "Member data updated successfully.",
          //icon: <IconCheck />,
          autoClose: 5000,
        });
        editForm.reset();
        setEditOpened(false);

        //getting updated items from database
        refetch();
      })
      .catch((error) => {
        updateNotification({
          id: "update-student",
          color: "red",
          title: "Student updating failed",
          icon: <IconX />,
          message: "We were unable to update the Student",
          // icon: <IconAlertTriangle />,
          autoClose: 5000,
        });
      });
  };

  // delete Staff Member function
  const deleteStudent = (values: {
    _id : string;
    name: string;
   
  }) => {
    CoordinatorAPI.deleteStudent(values)
      .then((res) => {
        showNotification({
          title: `${values.name} was deleted`,
          message: "Member was deleted successfully",
          autoClose: 1500,
          icon: <IconCheck />,
          color: "teal",
        });

        // after successing the deletion refetch the data from the database
        refetch();

        // clear all the fields
        deleteForm.reset();

        // then close the delete modal
        setDeleteOpen(false);
      })
      .catch((err) => {
        showNotification({
          title: `${values.name} was not deleted`,
          message: "Student was not deleted",
          autoClose: 1500,
          icon: <IconX />,
          color: "red",
        });
      });
  };



  const rows = sortedData.map((row:any) => (
    <Table.Tr key={row._id}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.regNo}</Table.Td>
      <Table.Td>{row.specialization}</Table.Td>
      <Table.Td>{row.batch}</Table.Td>
      <Table.Td>{row.semester}</Table.Td>
      <Table.Td>
        <center>
        <Tooltip label="Edit">
          <ActionIcon
            onClick={() =>{
              editForm.setValues({
                _id : row._id,
                name : row.name,
                email : row.email,
                regNo : row.regNo,
                specialization : row.specialization,
                batch : row.batch,
                semester : row.semester,


              });
              setEditOpened(true);
            }}
            style={{ marginRight: '30px'}}
            color="blue"
          >
          <IconEdit/>
          </ActionIcon>  
        </Tooltip>
       
        <Tooltip label="Delete Member">

        <ActionIcon
          color="red"
          onClick={() => {
            deleteForm.setValues({
              _id : row._id,
              name: row.name,
            });
            setDeleteOpen(true);
          }}
          
        >
          <IconTrash/>
          </ActionIcon>
        </Tooltip>
        </center>
      
      </Table.Td>
  
     
    </Table.Tr>
  ));

  //from Structure
  const registerForm = useForm({
    validateInputOnChange: true,

    initialValues: {
      name: "",
      email: "",
      regNo: "",
      specialization :  "",
      batch : "",
      semester : "",      
    },validate: {
      email: (value) =>
        /\S+@\S+\.\S+/.test(
          value
        )
          ? null
          : "Invalid Email",
    },
  });

  //declare edit form
  const editForm = useForm({
    validateInputOnChange:true,

    initialValues:{
      _id : "",
      name : "",
      email : "",
      regNo : "",
      specialization : "",
      batch : "",
      semester : "",
    },
  });

   //Declare delete form
   const deleteForm = useForm({
    validateInputOnChange:true,

    initialValues:{
      _id : "",
      name : "",
    },
   });

   if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div style={{ position : 'absolute' , top:'160px'}}>
      {/* Add User Modal */}
     
        <Modal opened={opened} onClose={close} title="Add Student">
        <form onSubmit={registerForm.onSubmit((values)=> registerStudent(values))}>
          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            rightSection={IconUserr}
            label="Name"
            placeholder="Student Name"
            {...registerForm.getInputProps("name")}
          />
          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            rightSection={icon}
            label="Email"
            placeholder="Your email"
            {...registerForm.getInputProps("email")}
          />
          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            label="Registration No"
            placeholder="Registration No"
            {...registerForm.getInputProps("regNo")}
          />

          <Select
            name="role"
            label="Specialization"
            placeholder="Select Specialization"
            required
            data={[
              { value: "IT", label: "IT" },
              { value: "SE", label: "SE" },
              { value: "IS", label: "IS" },
              { value: "CS", label: "CS" },
              { value: "DS", label: "DS" },
              { value: "CSNE", label: "CSNE" },
            ]}
            {...registerForm.getInputProps("specialization")}
          />


          <Select
            name="batch"
            label="Batch"
            placeholder="Select Batch"
            required
            data={[
              { value: "JUNE", label: "JUNE Batch" },
              { value: "REGULAR", label: "Regular Batch" },
              
            ]}
            {...registerForm.getInputProps("batch")}
          />

          <Select
            name="semester"
            label="Semester"
            placeholder="Select Semester"
            required
            data={[
              { value: "1ST", label: "1 st Semester" },
              { value: "2ND", label: "2 nd Semester" },
              
            ]}
            {...registerForm.getInputProps("semester")}
          />

          <center style={{ paddingTop: '10px' }}>
            <Button
              type="submit"
              variant="gradient"
              gradient={{ from: "gray", to: "blue", deg: 0 }}

            >
              Add Student
            </Button>
          </center>
          </form>
        </Modal>
      

      <div style={{ marginLeft: '-200px', marginRight: '50px' }} >
       {/* Delete student Modal */}
       <Modal
        opened={deleteOpen}
        centered
        onClose={()=>{
          deleteForm.reset();
          setDeleteOpen(false);
        }}
        title="Delete Student"
      >
        <Box>
          <Text size={"sm"} mb={10}>
            Are you sure want to delete this member?
          </Text>
          <form onSubmit={deleteForm.onSubmit((values)  => deleteStudent(values))}>
            
          
            <TextInput
               withAsterisk
               label="Member ID"
               required
               disabled
               mb={10}
               {...deleteForm.getInputProps("name")}
             />

              <Button
                color="gray"
                variant="outline"
                onClick={() => {
                  deleteForm.reset();
                  setDeleteOpen(false);
                }}
              >
                No I don't delete it
              </Button>
              <Button
                style={{marginLeft : '10px'}}
                color="red"
                type="submit"
              >
                Delete it
              </Button>
          </form>
        </Box>
      </Modal>

      {/* student edit modal */}
      
      <Modal opened={editOpened} onClose={()=>{
        editForm.reset();
        setEditOpened(false);
      }} title="Edit Student Details">
         <form onSubmit={editForm.onSubmit((values) => updateStudent(values))}>
        <TextInput
          mt="md"
          rightSectionPointerEvents="none"
          rightSection={IconUserr}
          label="Name"
          placeholder="Student Name"
          {...editForm.getInputProps("name")}
        />
        <TextInput
          mt="md"
          rightSectionPointerEvents="none"
          rightSection={icon}
          label="Email"
          placeholder="Your email"
          {...editForm.getInputProps("email")}
        />
        <TextInput
          mt="md"
          rightSectionPointerEvents="none"
          label="Registration No"
          placeholder="Registration No"
          {...editForm.getInputProps("regNo")}
        />

<Select
            name="role"
            label="Specialization"
            placeholder="Select Specialization"
            required
            data={[
              { value: "IT", label: "IT" },
              { value: "SE", label: "SE" },
              { value: "IS", label: "IS" },
              { value: "CS", label: "CS" },
              { value: "DS", label: "DS" },
              { value: "CSNE", label: "CSNE" },
            ]}
            {...editForm.getInputProps("specialization")}
          />

        <Select
            name="batch"
            label="Batch"
            placeholder="Select Batch"
            required
            data={[
              { value: "JUNE", label: "JUNE Batch" },
              { value: "REGULAR", label: "Regular Batch" },
              
            ]}
            {...editForm.getInputProps("batch")}
          />

        <TextInput
          mt="md"
          rightSectionPointerEvents="none"
          label="Semester"
          placeholder="Semster"
          {...editForm.getInputProps("semester")}
        />

        <center  style={{paddingTop:'10px'}}>
          <Button
          type="submit"
            variant="gradient"
            gradient={{ from: "gray", to: "blue", deg: 0 }}
           
          >
            Edit Details
          </Button>
        </center>
        </form>
      </Modal>
      

      <div >
        <ScrollArea>
          <div style={{ marginBottom: "50px" }}>
            <TextInput
              placeholder="Search by any field"
              style={{
                width: "calc(80% - 60px)",
                marginRight: "10px",
                display: "inline-block",
              }}
              leftSection={
                <IconSearch
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
              value={search}
              onChange={handleSearchChange}
            />
            <Button
              onClick={open}
              style={{
                width: "130px",
                display: "inline-block",
                marginLeft: "50px",
              }}
            >
              Add Student
            </Button>
          </div>

          <Table


            highlightOnHover
            withTableBorder
            withColumnBorders
            horizontalSpacing="md"
            verticalSpacing="xs"
            miw={700}
            layout="fixed"
          >
            <Table.Tbody>
              <Table.Tr>
                <Th
                  sorted={sortBy === "name"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("name")}
                >
                  Name
                </Th>
                <Th
                  sorted={sortBy === "email"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("email")}
                >
                  Email
                </Th>
                <Th
                  sorted={sortBy === "regNo"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("regNo")}
                >
                  Registration No
                </Th>
                <Th
                  sorted={sortBy === "specialization"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("specialization")}
                >
                  specialization
                </Th>
                <Th
                  sorted={sortBy === "batch"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("batch")}
                >
                  batch
                </Th>
                <Th
                  sorted={sortBy === "semester"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("semester")}
                >
                  semester
                </Th>
                <Th
                  sorted={sortBy === "semester"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("semester")}
                >
                  Action
                </Th>
              </Table.Tr>
            </Table.Tbody>
            <Table.Tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={Object.keys(data[0]).length}>
                    <Text fw={500} ta="center">
                      Nothing found
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  </div>
  );
};

export default StudentDetails;
