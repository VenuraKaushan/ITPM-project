
import { useState } from 'react';
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
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from '../../../Styles/TableSort.module.css';
import { ViewMarkSheetPage } from '../../../pages/CoodinatorPage/viewMarkSheetPage';
import { Navigate, useNavigate } from 'react-router-dom';

interface RowData {
  _id: string;
  groupNo: string;
  topic: string;

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

const data = [
  {
    _id: 'string',
    groupNo: "string",
    topic: "string",
  },
  {
    _id: 'string',
    groupNo: "string",
    topic: "string",
  },


];

export function ViewMarkSheet() {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const navigate = useNavigate();

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

  const rows = sortedData.map((row) => (
    <Table.Tr key={row._id}>
      <Table.Td>{row._id}</Table.Td>
      <Table.Td>{row.groupNo}</Table.Td>
      <Table.Td>{row.topic}</Table.Td>
      <center>
        <Table.Td><Button onClick={() => navigate('/ViewMarkSheetPage')} variant="filled" color="teal" size="xs" radius="xs">View</Button></Table.Td>
      </center>

    </Table.Tr>
  ));

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
              sorted={sortBy === '_id'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('_id')}
            >
              ID
            </Th>
            <Th
              sorted={sortBy === 'groupNo'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('groupNo')}
            >
              Group No
            </Th>
            <Th
              sorted={sortBy === 'topic'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('topic')}
            >
              Topic
            </Th>
            <Th
              sorted={sortBy === 'topic'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('topic')}
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
  );
}