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
  statusReport1: string;
  proposalDocument: string;
  statusReport2: string;
  logBook: string;
  finalThesis: string;
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
    statusReport1: "string",
    proposalDocument: "string",
    statusReport2: "string",
    logBook: "string",
    finalThesis: "string",
  },

 
  {
    _id: "string",
    groupNo: "string",
    studentName: "string",
    regNo: "string",
    statusReport1: "string",
    proposalDocument: "string",
    statusReport2: "string",
    logBook: "string",
    finalThesis: "string",
  },
];

const ReportsMarks = () => {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
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
      <Table.Td>{row.statusReport1}</Table.Td>
      <Table.Td>{row.proposalDocument}</Table.Td>
      <Table.Td>{row.statusReport2}</Table.Td>
      <Table.Td>{row.logBook}</Table.Td>
      <Table.Td>{row.finalThesis}</Table.Td>

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
                  statusReport1: row.statusReport1,
                  proposalDocument: row.proposalDocument,
                  statusReport2: row.statusReport2,
                  logBook : row.logBook,
                  finalThesis : row.finalThesis,
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
    statusReport1: "",
    proposalDocument: "",
    statusReport2: "",
    logBook: "",
    finalThesis: "",
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
        statusReport1: "",
        proposalDocument: "",
        statusReport2: "",
        logBook: "",
        finalThesis: "",
    },
  });

  return (
    <>
    
    <div style={{ position: "absolute", top: "160px" }}>
      

      
      {/* Reports edit modal */}
      <form>
        <Modal
          opened={editOpened}
          onClose={() => {
            editForm.reset();
            setEditOpened(false);
          }}
          title="Edit Reports Marks"
        >
        <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            rightSection={IconUserr}
            label="Group No"
            placeholder="Group No"
          />
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
            label="Registration No"
            placeholder="Registration No"
            
          />
          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            label="Status Report 1"  
            placeholder=""
          />

          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            label="Proposal Document"
            placeholder="Proposal Document"
          />

          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            label="Status Reports 2"  
            placeholder="Status Report 2"
          />

          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            label="Log Book"  
            placeholder="Log Book"
          />

        <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            label="Final Thesis"  
            placeholder="Final Thesis"  
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

      <div style={{  marginRight: "50px" }}>
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
                  sorted={sortBy === "statusReport1"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("statusReport1")}
                >
                  Status Reports 1
                </Th>
                <Th
                  sorted={sortBy === "proposalDocument"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("proposalDocument")}
                >
                  Proposal Document
                </Th>
                <Th
                  sorted={sortBy === "statusReport2"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("statusReport2")}
                >
                  Status Report 2
                </Th>
                <Th
                  sorted={sortBy === "logBook"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("logBook")}
                >
                  Log Book
                </Th>
                <Th
                  sorted={sortBy === "finalThesis"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("finalThesis")}
                >
                  Final Thesis
                </Th>

                <Th
                  sorted={sortBy === "finalThesis"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("finalThesis")}
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

export default ReportsMarks;
