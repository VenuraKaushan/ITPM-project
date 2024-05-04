import { useState, useEffect } from "react";
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
  Select,
  FileInput,
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
  IconFileTypePdf,
  IconTrash,
  IconEdit,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import classes from "../../../Styles/TableSort.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { showNotification, updateNotification } from "@mantine/notifications";
import axios from "axios";
import CoordinatorAPI from "../../../API/coordinatorAPI/coordinator.api";

interface RowData {
  id: string;
  assessmentName: string;
  assessmentUpload: string;
  deadline: string;
  semester: string;
  specialization: string;
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

const AddAssessment = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["assessmentData"],
    queryFn: () => CoordinatorAPI.getAssessment().then((res) => res.data),
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
  const IconFileTypePdff = (
    <IconFileTypePdf style={{ width: rem(16), height: rem(16) }} />
  );
  const [file, setFile] = useState("");

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

  /*Add Assestment*/
  const submitAssessmentForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      assessmentName: "",
      deadline: "",
      submitDoc: "",
      semester: "",
      specialization: "",
    },
  });

  const handleFileChange = (file: any) => {
    console.log(file);
    setFile(file);
  };

  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  //handle file upload
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Make HTTP request to backend API to upload file
      const response = await axios.post(
        "http://localhost:3001/pmapi/question/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Call submitAssessment with response data after successful upload
      handleSubmit({
        ...submitAssessmentForm.values,
        submitDoc: response.data,
      });
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  const handleSubmit = async (values: {
    assessmentName: string;
    submitDoc: string;
    deadline: string;
    specialization: string;
    semester: string;
  }) => {
    try {
      const res = await CoordinatorAPI.addAssestment(values);

      submitAssessmentForm.reset();
      close(); // Close modal after successful submission

      refetch();
    } catch (error) {
      // Handle error
      console.error("Error adding assessment:", error);
    }
  };

  // delete Staff Member function
  const deleteAssestment = (values: {
    _id: string;
    assessmentName: string;
  }) => {
    CoordinatorAPI.deleteAssestment(values)
      .then((res) => {
        showNotification({
          title: `${values._id} was deleted`,
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
          title: `${values.assessmentName} was not deleted`,
          message: "Student was not deleted",
          autoClose: 1500,
          icon: <IconX />,
          color: "red",
        });
      });
  };

  //Update Assestment details
  const updateAssestment = async (values: {
    _id: string;
    assessmentName: string;
    deadline: string;
    submitDoc: string;
    semester: string;
    specialization: string;
  }) => {
    console.log(values);
    showNotification({
      id: "update-Assestment",
      loading: true,
      title: "Updating Assestment record",
      message: "Please wait while we update record..",
      autoClose: 2000,
    });
    CoordinatorAPI.updateAssestmentDetails(values)
      .then((response) => {
        updateNotification({
          id: "update-Assestment",
          color: "teal",
          icon: <IconCheck />,
          title: "Assestment updated successfully",
          message: "Assestment data updated successfully.",
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
          id: "update-Assestment",
          color: "red",
          title: "Assestment updating failed",
          icon: <IconX />,
          message: "We were unable to update the Assestment",
          // icon: <IconAlertTriangle />,
          autoClose: 3000,
        });
      });
  };

  
  const rows = sortedData.map((row: any) => (
    <Table.Tr key={row._id}>
      <Table.Td>{row.assestmentName}</Table.Td>
      <Table.Td>{row.quesDoc}</Table.Td>
      <Table.Td>{new Date(row.deadline).toLocaleDateString("en-CA")}</Table.Td>
      <Table.Td>{row.specialization}</Table.Td>
      <Table.Td>{row.semster}</Table.Td>

      <Table.Td>
        <center>
          <Tooltip label="Edit">
            <ActionIcon
              onClick={() => {
                editForm.setValues({
                  _id: row._id,
                  assessmentName: row.assestmentName,
                  submitDoc: row.quesDoc,
                  deadline: new Date(row.deadline).toLocaleDateString("en-CA"),
                  specialization: row.specialization,
                  semester: row.semster,
                });
                setEditOpened(true);
              }}
              style={{ marginRight: "30px" }}
              color="blue"
            >
              <IconEdit />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Delete Assessment">
            <ActionIcon
              color="red"
              onClick={() => {
                deleteForm.setValues({
                  _id: row._id,
                  assessmentName: row.assessmentName,
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
  const form = useForm({
    validateInputOnChange: true,

    initialValues: {
      id: "",
      assessmentName: "",
      assessmentUpload: "",
      deadline: "",
      semester: "",
      specialization: "",
    },
  });

  //declare edit form
  const editForm = useForm({
    validateInputOnChange: true,

    initialValues: {
      _id: "",
      assessmentName: "",
      deadline: "",
      submitDoc: "",
      semester: "",
      specialization: "",
    },
  });

  //Declare delete form
  const deleteForm = useForm({
    validateInputOnChange: true,

    initialValues: {
      _id: "",
      assessmentName: "",
    },
  });

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div style={{ position: "absolute", top: "160px" }}>
      {/* Add assessment Modal */}

      <Modal opened={opened} onClose={close} title="Add Assessment">
        <form
          onSubmit={submitAssessmentForm.onSubmit((values) =>
            handleSubmit(values)
          )}
        >
          <TextInput
            mt="md"
            label="Assessment Name"
            placeholder="Assessment Name"
            name="assessmentName"
            {...submitAssessmentForm.getInputProps("assessmentName")}
          />
          <FileInput
            placeholder="Pick file"
            label="Add Assessment"
            withAsterisk
            name="submitDoc"
            onChange={handleFileChange}
          />
          <TextInput
            mt="md"
            label="Deadline"
            placeholder="Deadline"
            type="date"
            name="deadline"
            {...submitAssessmentForm.getInputProps("deadline")}
          />
          <Select
            required
            label="Select Specialization"
            placeholder="Choose..."
            data={["IT", "SE", "DS", "CSNE"]}
            style={{ maxWidth: "200px" }}
            {...submitAssessmentForm.getInputProps("specialization")}
          />
          <TextInput
            mt="md"
            label="Semester"
            placeholder="Semester"
            name="semester"
            {...submitAssessmentForm.getInputProps("semester")}
          />
          <Button
            mt="lg"
            variant="gradient"
            gradient={{ from: "gray", to: "blue", deg: 0 }}
            type="submit"
          >
            Add Assessment
          </Button>
        </form>
      </Modal>

      {/* Delete Assessment Modal */}
      <Modal
        opened={deleteOpen}
        centered
        onClose={() => {
          deleteForm.reset();
          setDeleteOpen(false);
        }}
        title="Delete Assessment"
      >
        <Box>
          <Text size={"sm"} mb={10}>
            Are you sure want to delete this assessment?
          </Text>
          <form
            onSubmit={deleteForm.onSubmit((values) => deleteAssestment(values))}
          >
            <TextInput
              withAsterisk
              label="Assessment Name"
              required
              disabled
              mb={10}
              {...deleteForm.getInputProps("_id")}
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
            <Button color="red" type="submit">
              Delete it
            </Button>
          </form>
        </Box>
      </Modal>

      {/* edit assessment form */}

      <Modal
        opened={editOpened}
        onClose={() => {
          editForm.reset();
          setEditOpened(false);
        }}
        title="Edit Assessment"
      >
        <form
          onSubmit={editForm.onSubmit((values) => updateAssestment(values))}
        >
          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            rightSection={IconUserr}
            label="Assessment Name"
            placeholder="Assessment Name"
            {...editForm.getInputProps("assessmentName")}
          />
          <FileInput
            placeholder="Pick file"
            label="Add Assessment"
            withAsterisk
            name="submitDoc"
            {...editForm.getInputProps("submitDoc")}
          />
          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            label="Deadline"
            placeholder="Deadline"
            {...editForm.getInputProps("deadline")}
          />

          <Select
            required
            label="Select Specialization"
            placeholder="Choose..."
            data={["IT", "SE", "DS", "CSNE"]}
            style={{ maxWidth: "200px" }}
            {...editForm.getInputProps("specialization")}
          />

          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            label="Semester"
            placeholder="Semester"
            {...editForm.getInputProps("semester")}
          />

          <center style={{ paddingTop: "10px" }}>
            <Button
              variant="gradient"
              gradient={{ from: "gray", to: "blue", deg: 0 }}
              type="submit"
            >
              Edit Assessment
            </Button>
          </center>
        </form>
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
                width: "130px",
                display: "inline-block",
                marginLeft: "50px",
              }}
            >
              Add
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
                {/* <Th
                  sorted={sortBy === "id"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("id")}
                >
                 ID
                </Th>                                          */}
                <Th
                  sorted={sortBy === "assessmentName"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("assessmentName")}
                >
                  Assessment Name
                </Th>
                <Th
                  sorted={sortBy === "assessmentUpload"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("assessmentUpload")}
                >
                  Assessment Upload
                </Th>
                <Th
                  sorted={sortBy === "deadline"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("deadline")}
                >
                  Deadline
                </Th>
                <Th
                  sorted={sortBy === "specialization"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("specialization")}
                >
                  Specialization
                </Th>
                <Th
                  sorted={sortBy === "semester"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("semester")}
                >
                  Semester
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
  );
};

export default AddAssessment;
