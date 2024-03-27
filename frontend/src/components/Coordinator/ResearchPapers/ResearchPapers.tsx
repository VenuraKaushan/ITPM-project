import { useState , useEffect  } from "react";
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
  NativeSelect,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconUpload,
  IconX,
  IconPhoto,
} from "@tabler/icons-react";
import classes from "../../../Styles/TableSort.module.css";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import CoordinatorAPI from "../../../API/coordinatorAPI/coordinator.api";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "@mantine/form";

interface RowData {
  _id: string;
  groupID: string;
  title: string;
  description: string;
  category: string;
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

const elements = [
  {
    registrationNo: " JUN_WE_001",
    title: "VD room",
    category: "Fasion",
    members: 4,
  },
];

export function ResearchPapers() {
  //use react query and fetch research data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["ViewMarkSheet"],
    queryFn: () =>
      CoordinatorAPI.getViewMarkSheetDetaiils().then((res) => res.data),
  });

  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data ? data : []);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

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

  const rows = sortedData.map((row:any) => (
    <Table.Tr key={row._id}>
      <Table.Td>{row.groupID}</Table.Td>
      <Table.Td>{row.title}</Table.Td>
      <Table.Td>{row.category}</Table.Td>
      <Table.Td>
        <Button
          variant="gradient"
          gradient={{ from: "grape", to: "indigo", deg: 0 }}
          onClick={open}
        >
          View
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

   //declare view form
   const Form = useForm({
    validateInputOnChange:true,

    initialValues:{
      _id : "",
      groupID : "",
      title : "",
      category : "",

    },
  });

  if(isLoading){
    return <div>Is Loading....</div>;

  }

  return (
    <ScrollArea>
      <TextInput
        style={{ paddingTop: "20px" }}
        placeholder="Search by any field"
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="lg"
        verticalSpacing="lg"
        miw={900}
        layout="auto"
        withTableBorder
        withColumnBorders

      >
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === "groupID"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("groupID")}
            >
              Registration No
            </Th>
            <Th
              sorted={sortBy === "title"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("title")}
            >
              Title
            </Th>
           
            <Th
              sorted={sortBy === "category"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("category")}
            >
              Category
            </Th>
            <Th
              sorted={sortBy === "category"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("category")}
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

      <Modal opened={opened} onClose={close} title="Accept Research" size="70%">
        <Text>Y4_RSR_GRP-1</Text>

        <Text fw={500} style={{ marginTop: "40px" }}>
          Group Members
        </Text>

        <div style={{ display: "flex", gap: 30 }}>
          <TextInput
            rightSectionPointerEvents="none"
            label="Name"
            placeholder="Venura"
            disabled
          />
          <TextInput
            rightSectionPointerEvents="none"
            label="Name"
            placeholder="Vinnath"
            disabled
            // {...form.getInputProps("email")}
          />
          <TextInput
            rightSectionPointerEvents="none"
            label="Name"
            placeholder="Sahan"
            disabled
          />

          <TextInput
            rightSectionPointerEvents="none"
            label="Name"
            placeholder="Shehan"
            disabled
          />
        </div>

        <Text fw={500} style={{ marginTop: "30px" }}>
          Supervisors
        </Text>
        <div style={{ display: "flex", gap: 30 }}>
          <NativeSelect
            name="SupervisorName"
            w="200px"
            label="Supervisor Name"
            data={["XYZ", "NMO"]}
            required
          />

          <NativeSelect
            name="coSupervisorName"
            w="200px"
            label="Co-Supervisor Name"
            data={["XYZ", "NMO"]}
            required
          />
        </div>

        <div style={{ display: "flex", gap: 30, marginTop: "20px" }}>
          <Text fw={500} style={{ marginTop: "30px" }}>
            Name of the conference or journal
          </Text>

          <TextInput
            style={{ marginTop: "25px" }}
            rightSectionPointerEvents="none"
            placeholder="VD Room"
            disabled
          />
        </div>

        <div style={{ display: "flex", gap: 30, marginTop: "20px" }}>
          <Text fw={500} style={{ marginTop: "30px" }}>
            Link for view H-index
          </Text>

          <TextInput
            style={{ marginTop: "25px" }}
            rightSectionPointerEvents="none"
          />

          <Text fw={500} style={{ marginTop: "30px" }}>
            Link for verify the Scopus indexing{" "}
          </Text>

          <TextInput
            style={{ marginTop: "25px" }}
            rightSectionPointerEvents="none"
          />
        </div>

        <Text fw={500} style={{ marginTop: "30px" }}>
          Photo of the acceptance
        </Text>

        <div>
          <Dropzone
            onDrop={(files) => console.log("accepted files", files)}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            // {...props}
          >
            <Group
              justify="center"
              gap="xl"
              mih={220}
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  The file should not exceed 5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
        </div>

        <center style={{ paddingTop: "10px" }}>
          <Button
            variant="gradient"
            gradient={{ from: "gray", to: "blue", deg: 0 }}
          >
            Accept Research
          </Button>
        </center>
      </Modal>
    </ScrollArea>
  );
}
