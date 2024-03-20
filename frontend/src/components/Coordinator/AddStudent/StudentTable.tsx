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
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconAt,
  IconUser,
} from "@tabler/icons-react";
import classes from "../../../Styles/TableSort.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { showNotification } from '@mantine/notifications';

interface RowData {
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
    name: "Athena Weissnat",
    company: "Little - Rippin",
    email: "Elouise.Prohaska@yahoo.com",
    regNo: "IT21244766",
    specialization: "IT",
    batch: "June Batch",
    semester: "1st",
  },
  {
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
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.regNo}</Table.Td>
      <Table.Td>{row.specialization}</Table.Td>
      <Table.Td>{row.batch}</Table.Td>
      <Table.Td>{row.semester}</Table.Td>
    </Table.Tr>
  ));

  //from Structure
  const form = useForm({
    validateInputOnChange: true,

    initialValues: {
      name: "",
      email: "",
      regNo: "",
      specialization: "",
      batch: "",
      semester: "",

    }, validate: {
      email: (value) =>
        /\S+@\S+\.\S+/.test(
          value
        )
          ? null
          : "Invalid Email",
    },
  });

  return (
    <div style={{ position: 'absolute', top: '160px' }}>
      {/* Add User Modal */}
      <form>
        <Modal opened={opened} onClose={close} title="Authentication">
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
            {...form.getInputProps("email")}
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

          <center style={{ paddingTop: '10px' }}>
            <Button
              variant="gradient"
              gradient={{ from: "gray", to: "blue", deg: 0 }}

            >
              Add Student
            </Button>
          </center>
        </Modal>
      </form>

      <div style={{ marginLeft: '-200px', marginRight: '50px' }} >
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

export default StudentDetails;
