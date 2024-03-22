import { useState } from "react";
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
  IconCheck,
  
} from "@tabler/icons-react";
import classes from "../../../Styles/TableSort.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
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

const data = [
  {
    _id : "001",
    name: "Athena Weissnat",
    company: "Little - Rippin",
    email: "Elouise.Prohaska@yahoo.com",
    regNo: "IT21244766",
    specialization: "IT",
    batch: "June Batch",
    semester: "1st",
  },
  {
    _id : "002",
    name: "Deangelo Runolfsson",
    company: "Greenfelder - Krajcik",
    email: "Kadin_Trantow87@yahoo.com",
    regNo: "IT21244766",
    specialization: "IT",
    batch: "June Batch",
    semester: "1st",
  },
];

const StudentDetails = () => {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const[editOpened , setEditOpened] = useState(false);
  const[deleteOpen , setDeleteOpen] = useState(false);
  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const IconUserr = <IconUser style={{ width: rem(16), height: rem(16) }} />;

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

      //  registerForm.reset();
      //  open(false);

      //getting updated details from the DB
      //  refetch();
    });
  };


  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
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

          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            label="Specialization"
            placeholder="Specialization"
            {...registerForm.getInputProps("specialization")}
          />

          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            label="Batch"
            placeholder="batch"
            {...registerForm.getInputProps("batch")}
          />

          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            label="Semester"
            placeholder="Semster"
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
          <form onSubmit={deleteForm.onSubmit((values) =>{
            
          })}
          >
            <TextInput
               withAsterisk
               label="Member ID"
               required
               disabled
               mb={10}
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
                color="red"
                type="submit"
                
              >
                Delete it
              </Button>
          </form>
        </Box>
      </Modal>

      {/* student edit modal */}
      <form>
      <Modal opened={editOpened} onClose={()=>{
        editForm.reset();
        setEditOpened(false);
      }} title="Edit Student Details">
        <TextInput
          mt="md"
          rightSectionPointerEvents="none"
          rightSection={IconUserr}
          label="Name"
          placeholder="Student Name"
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
        />

        <TextInput
          mt="md"
          rightSectionPointerEvents="none"
          label="Specialization"
          placeholder="Specialization"
        />

        <TextInput
          mt="md"
          rightSectionPointerEvents="none"
          label="Batch"
          placeholder="batch"
        />

        <TextInput
          mt="md"
          rightSectionPointerEvents="none"
          label="Semester"
          placeholder="Semster"
        />

        <center  style={{paddingTop:'10px'}}>
          <Button
            variant="gradient"
            gradient={{ from: "gray", to: "blue", deg: 0 }}
           
          >
            Edit Details
          </Button>
        </center>
      </Modal>
      </form>

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
