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
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconAt,
  IconUser,
  IconEdit,
  IconMessage,
} from "@tabler/icons-react";
import classes from "../../../Styles/TableSort.module.css";

import { useForm } from "@mantine/form";

interface RowData {
  _id: string;
  groupNo: string;
  studentName: string;
  regNo: string;
  proposal: string;
  progress1: string;
  progress2: string;
  final: string;
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
    _id: "string",
    groupNo: "string",
    studentName: "string",
    regNo: "string",
    proposal: "string",
    progress1: "string",
    progress2: "string",
    final: "string",
  },
  {
    _id: "string",
    groupNo: "string",
    studentName: "string",
    regNo: "string",
    proposal: "string",
    progress1: "string",
    progress2: "string",
    final: "string",
  },
];

const AssessmentMark = () => {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [commentsOpened, setCommentsOpened] = useState(false);
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

  const rows = sortedData.map((row) => (
    <Table.Tr key={row._id}>
      <Table.Td>{row._id}</Table.Td>
      <Table.Td>{row.groupNo}</Table.Td>
      <Table.Td>{row.studentName}</Table.Td>
      <Table.Td>{row.regNo}</Table.Td>
      <Table.Td>{row.proposal}</Table.Td>
      <Table.Td>{row.progress1}</Table.Td>
      <Table.Td>{row.progress2}</Table.Td>
      <Table.Td>{row.final}</Table.Td>

      <Table.Td>
        <center>
          <Tooltip label="Edit">
            <ActionIcon
              onClick={() => {
                editForm.setValues({
                  _id: row._id,
                  groupNo: row.groupNo,
                  studentName: row.studentName,
                  regNo: row.regNo,
                  proposal: row.proposal,
                  progress1: row.progress1,
                  progress2: row.progress2,
                  final: row.final,
                });
                setEditOpened(true);
              }}
              style={{ marginRight: "30px" }}
              color="blue"
            >
              <IconEdit />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="View">
            <ActionIcon
              onClick={() => {
                commentsForm.setValues({});
                setCommentsOpened(true);
              }}
              color="#89ec9c"
            >
              <IconMessage />
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
      _id: "",
      groupNo: "",
      studentName: "",
      regNo: "",
      proposal: "",
      progress1: "",
      progress2: "",
      final: "",
    },
  });

  const commentsForm = useForm({
    validateInputOnChange: true,

    initialValues: {
      proposal: "",
      progress1: "",
      progress2: "",
      final: "",
    },
  });

  //declare edit form
  const editForm = useForm({
    validateInputOnChange: true,

    initialValues: {
      _id: "",
      groupNo: "",
      studentName: "",
      regNo: "",
      proposal: "",
      progress1: "",
      progress2: "",
      final: "",
    },
  });

  return (
    <>
      <div style={{ position: "absolute", top: "160px" }}>
        {/* View  student  Comments Modal */}
        <form>
          <Modal
          size= "80%"
            opened={commentsOpened}
            onClose={() => {
              editForm.reset();
              setCommentsOpened(false);
            }}
            title="View Comments"
          >
            <Table withTableBorder withColumnBorders>
              <Table.Tr>
                <Table.Th></Table.Th>
                <Table.Th>Proposal</Table.Th>
                <Table.Th>Progress 1</Table.Th>
                <Table.Th>Progress2</Table.Th>
                <Table.Th>Final</Table.Th>
              </Table.Tr>

              <Table.Tr>
                <Table.Th>Examiner</Table.Th>
               
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Supervisor</Table.Th>
               
              </Table.Tr>
            </Table>
          </Modal>
        </form>

        {/* student edit modal */}
        <form>
          <Modal
            opened={editOpened}
            onClose={() => {
              editForm.reset();
              setEditOpened(false);
            }}
            title="Edit Assessment Marks"
          >
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
              label="Registration Number"
              placeholder="IT21244766"
              {...form.getInputProps("regNo")}
            />
            <TextInput
              mt="md"
              rightSectionPointerEvents="none"
              label="Proposal"
              placeholder="Proposal"
            />

            <TextInput
              mt="md"
              rightSectionPointerEvents="none"
              label="Progress 1"
              placeholder="Progress 1"
            />

            <TextInput
              mt="md"
              rightSectionPointerEvents="none"
              label="Progress 2"
              placeholder="Progress 2"
            />

            <TextInput
              mt="md"
              rightSectionPointerEvents="none"
              label="Final"
              placeholder="Final"
            />

            <center style={{ paddingTop: "10px" }}>
              <Button
                variant="gradient"
                gradient={{ from: "gray", to: "blue", deg: 0 }}
              >
                Edit Details
              </Button>
            </center>
          </Modal>
        </form>

        <div style={{ marginRight: "50px" }}>
          <ScrollArea>
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
                    sorted={sortBy === "_id"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("_id")}
                  >
                    ID
                  </Th>
                  <Th
                    sorted={sortBy === "groupNo"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("groupNo")}
                  >
                    Group No
                  </Th>
                  <Th
                    sorted={sortBy === "studentName"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("studentName")}
                  >
                    Student Name
                  </Th>
                  <Th
                    sorted={sortBy === "regNo"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("regNo")}
                  >
                    Registration number
                  </Th>
                  <Th
                    sorted={sortBy === "proposal"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("proposal")}
                  >
                    Proposal
                  </Th>
                  <Th
                    sorted={sortBy === "progress1"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("progress1")}
                  >
                    Progress 1
                  </Th>
                  <Th
                    sorted={sortBy === "progress2"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("progress2")}
                  >
                    Progress 2
                  </Th>
                  <Th
                    sorted={sortBy === "final"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("final")}
                  >
                    Final
                  </Th>
                  <Th
                    sorted={sortBy === "final"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("final")}
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
    </>
  );
};

export default AssessmentMark;
