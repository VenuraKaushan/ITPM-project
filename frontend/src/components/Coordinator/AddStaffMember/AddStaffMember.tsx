import { useEffect, useState,useRef } from "react";
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
  Tooltip,
  Modal,
  ActionIcon,
  Box,
  Select,
  Autocomplete,
  Loader,
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
  IconX,
} from "@tabler/icons-react";
import classes from "../../../Styles/TableSort.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import CoordinatorAPI from "../../../API/coordinatorAPI/coordinator.api";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";


interface RowData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  role: string;
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
  Object.values(item).some((value) =>
  value.toString().toLowerCase().includes(query)
  )
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

const AddStaffMember = () => {
  //use react query and fetch research data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["staffMemberData"],
    queryFn: () =>
      CoordinatorAPI.getAllStaffMemberDetails().then((res) => res.data),
  });

  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data ? data : []);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, setEditOpened] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const IconUserr = <IconUser style={{ width: rem(16), height: rem(16) }} />;

 // customer email
    const timeoutRef = useRef<number>(-1);
    const[emailLoader,setEmailloader] = useState(false);
    const[email,setEmail] = useState('');
    const[emailData,setEmailData] = useState<string[]>([])

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

  const registerMember = async (values: {
    name: string;
    phone: string;
    specialization: string;
    role: string;
  }) => {
    console.log(values);
    showNotification({
      id: "Add Member",
      loading: true,
      title: "Adding Member Record",
      message: "please wait while we add member record..",
      autoClose: 1000,
    });

    CoordinatorAPI.memberRegister({...values,email}).then((Response) => {
      updateNotification({
        id: "Add Worker",
        color: "teal",
        title: "Adding Worker record",
        message: "Please wait while we add Worker record..",
        icon: <IconCheck />,
        autoClose: 2500,
      });

      registerForm.reset();
      setEmail("");
      close();

      // getting updated details from the DB
      refetch();
    });
  };

  //Update the Member Details
  const updateStaffMember = async (values: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    specialization: string;
    role: string;
  }) => {
    console.log(values);
    showNotification({
      id: "update-Member",
      loading: true,
      title: "Updating Member record",
      message: "Please wait while we update record..",
      autoClose: false,
    });
    CoordinatorAPI.updateStaffMember(values)
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
          id: "update-member",
          color: "red",
          title: "Member updating failed",
          icon: <IconX />,
          message: "We were unable to update the Member",
          // icon: <IconAlertTriangle />,
          autoClose: 5000,
        });
      });
  };

  // delete Staff Member function
  const deleteMember = (values: { _id: string; name: string }) => {
    CoordinatorAPI.deleteMember(values)
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
          message: "Member was not deleted",
          autoClose: 1500,
          icon: <IconX />,
          color: "red",
        });
      });
  };

  const rows = sortedData?.map((row: any) => (
    <Table.Tr key={row._id}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.phone}</Table.Td>
      <Table.Td>{row.specialization}</Table.Td>
      <Table.Td>{row.role}</Table.Td>
      <Table.Td>
        <center>
          <Tooltip label="Edit">
            <ActionIcon
              onClick={() => {
                editForm.setValues({
                  _id: row._id,
                  name: row.name,
                  email: row.email,
                  phone: row.phone,
                  specialization: row.specialization,
                  role: row.role,
                });
                setEditOpened(true);
              }}
              style={{ marginRight: "30px" }}
              color="blue"
            >
              <IconEdit />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Delete Member">
            <ActionIcon
              color="red"
              onClick={() => {
                deleteForm.setValues({
                  _id: row._id,
                  name: row.name,
                });
                setDeleteOpen(true);
              }}
            >
              <IconTrash />
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
      phone: "",
      specialization: "",
      role: "",
    },
    validate: {
      phone: (value) =>
        /^\d{10}$/.test(value) ? null : "Invalid Phone Number",
    },
  });

  //declare edit form
  const editForm = useForm({
    validateInputOnChange: true,

    initialValues: {
      _id: "",
      name: "",
      email: "",
      phone: "",
      specialization: "",
      role: "",
    },
    validate: {
      name: (value) =>
      value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/\S+@\S+\.\S+/.test(value) ? null : "Invalid Email"),
      phone: (value) =>
        /^\d{10}$/.test(value) ? null : "Invalid Phone Number",
    },
  });

  //Declare delete form
  const deleteForm = useForm({
    validateInputOnChange: true,

    initialValues: {
      _id: "",
      name: "",
    },
  });

  if (isLoading) {
    return <div>Loading....</div>;
  }


  const handleEmailChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setEmail(val);
    setEmailData([]);

    if (val.trim().length === 0 || val.includes('@')) {
      setEmailloader(false);
    } else {
      setEmailloader(true);
      timeoutRef.current = window.setTimeout(() => {
        setEmailloader(false);
        setEmailData(['gmail.com', 'outlook.com', 'my.sliit.lk'].map((provider) => `${val}@${provider}`));
      }, 300);
    }
  };



  return (
    <div style={{ position: "absolute", top: "160px" }}>
      {/* Add User Modal */}

      <Modal opened={opened} onClose={close} title="Add Staff Member">
        <form
          onSubmit={registerForm.onSubmit((values) => registerMember(values))}
        >
          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            rightSection={IconUserr}
            label="Name"
            placeholder="Staff Member Name"
            {...registerForm.getInputProps("name")}
          />
      

        <Autocomplete
            label="Email"
            value = {email}
            data={emailData}
            onChange={handleEmailChange}
            rightSection={emailLoader ? <Loader size="1rem" /> : null}
            placeholder="example@gmail.com"
            mb={10}
            
            
          />

          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            label="Mobile No"
            placeholder="0711461106"
            {...registerForm.getInputProps("phone")}
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
            name="role"
            label="Role"
            placeholder="Select role"
            required
            data={[
              { value: "PROJECTMEMBER", label: "Project Member" },
              { value: "EXAMINER", label: "Examiner" },
              { value: "SUPERVISOR", label: "Supervisor" },
            ]}
            {...registerForm.getInputProps("role")}
          />

          <center style={{ paddingTop: "10px" }}>
            <Button
              variant="gradient"
              gradient={{ from: "gray", to: "blue", deg: 0 }}
              type="submit"
            >
              Add Member
            </Button>
          </center>
        </form>
      </Modal>

      {/* user edit modal */}

      <Modal
        opened={editOpened}
        onClose={() => {
          editForm.reset();
          setEditOpened(false);
        }}
        title="Edit Staff Member"
      >
        <form
          onSubmit={editForm.onSubmit((values) => updateStaffMember(values))}
        >
          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            rightSection={IconUserr}
            label="Name"
            placeholder="Staff Member Name"
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
            label="Mobile No"
            placeholder="0711461106"
            {...editForm.getInputProps("phone")}
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
            name="role"
            label="Role"
            placeholder="Select role"
            required
            data={[
              { value: "PROJECTMEMBER", label: "Project Member" },
              { value: "EXAMINER", label: "Examiner" },
              { value: "SUPERVISOR", label: "Supervisor" },
            ]}
            {...editForm.getInputProps("role")}
          />

          <center style={{ paddingTop: "10px" }}>
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

      {/* Delete Modal */}
      <Modal
        opened={deleteOpen}
        centered
        onClose={() => {
          deleteForm.reset();
          setDeleteOpen(false);
        }}
        title="Delete Member"
      >
        <Box>
          <Text size={"sm"} mb={10}>
            Are you sure want to delete this member?
          </Text>
          <form
            onSubmit={deleteForm.onSubmit((values) => deleteMember(values))}
          >
            <TextInput
              withAsterisk
              label="Member Name"
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
            <Button color="red" type="submit" style={{ marginLeft: "10px" }}>
              Delete it
            </Button>
          </form>
        </Box>
      </Modal>

      <div style={{ marginLeft: "-200px", marginRight: "50px" }}>
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
                width: "160px",
                display: "inline-block",
                marginLeft: "50px",
              }}
            >
              Add Staff Member
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
                  sorted={sortBy === "phone"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("phone")}
                >
                  Phone Number
                </Th>
                <Th
                  sorted={sortBy === "specialization"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("specialization")}
                >
                  Specialization
                </Th>
                <Th
                  sorted={sortBy === "role"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("role")}
                >
                  Role
                </Th>

                <th>Action</th>
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
  );
};

export default AddStaffMember;
