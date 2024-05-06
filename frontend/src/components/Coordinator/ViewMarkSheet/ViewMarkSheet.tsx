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
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from '../../../Styles/TableSort.module.css';
import { ViewMarkSheetPage } from '../../../pages/CoodinatorPage/viewMarkSheetPage';
import { useDisclosure } from '@mantine/hooks';
import CoordinatorAPI from '../../../API/coordinatorAPI/coordinator.api';
import { useQuery } from "@tanstack/react-query";
import { useForm } from "@mantine/form";



interface RowData {
  _id: string;
  groupID: string;
  title: string;

}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
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


export function ViewMarkSheet() {

//use react query and fetch research data
const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ["ViewMarkSheet"],
  queryFn: () =>
    CoordinatorAPI.getAssessmentMarks().then((res) => res.data),
});

console.log(data);


  const [search, setSearch] = useState('');
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
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row:any) => (
    <Table.Tr key={row._id}>
      <Table.Td>{row.groupID}</Table.Td>
      <Table.Td>{row.title}</Table.Td>
      <center>
      <Table.Td><Button onClick={open}>View</Button></Table.Td>
      </center>

    </Table.Tr>
  ));

    //declare view form
    const Form = useForm({
      validateInputOnChange:true,
  
      initialValues:{
        _id : "",
        groupID : "",
        title : "",

      },
    });

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <ScrollArea>
      <TextInput
        style={{ paddingTop: '20px' }}
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}

      />
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed" withTableBorder withColumnBorders>
        <Table.Tbody>
          <Table.Tr>
          
            <Th
              sorted={sortBy === 'groupID'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('groupID')}
              {...Form.getInputProps("groupID")}
            >
              Group No
            </Th>
            <Th
              sorted={sortBy === 'title'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('title')}
              {...Form.getInputProps("title")}
              
            >
              Topic
            </Th>
            <th
            >
              Action
            </th>
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

      <Modal
        opened={opened}
        onClose={close}
      fullScreen
        radius={0}
        transitionProps={{ transition: 'fade', duration: 200 }}
        
      >

        <ViewMarkSheetPage/>
        {/* Modal content */}
      </Modal>
    </ScrollArea>
  );
}