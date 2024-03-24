import { useState , useEffect } from 'react';
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
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from '../../../Styles/TableSort.module.css'
import { Select } from '@mantine/core';
import CoordinatorAPI from '../../../API/coordinatorAPI/coordinator.api';
import { useQuery } from "@tanstack/react-query";


interface RowData {
  _id : string;
  groupNo: string;
  title: string;
  regNo: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  
}

// function Th({ children, reversed, sorted}: ThProps) {
//   const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
//   return (
//     <Table.Th className={classes.th}>
//       <UnstyledButton className={classes.control}>
//         <Group justify="space-between">
//           <Text fw={500} fz="sm">
//             {children}
//           </Text>
//           <Center className={classes.icon}>
//             <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
//           </Center>
//         </Group>
//       </UnstyledButton>
//     </Table.Th>
//   );
// }

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




export function AssignProjectMember() {

   //use react query and fetch Group data
 const { data =[], isLoading, isError, refetch } = useQuery({
  queryKey: ["GroupData"],
  queryFn: () =>
    CoordinatorAPI.getGroupDetails().then((res) => res.data),
    
});


  const [search, setSearch] = useState('');

  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);



  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.currentTarget;
  //   setSearch(value);
  //   setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  // };

  console.log(data)

  const rows = data.map((row : any) => (
    <Table.Tr key={row.groups.groupID}>
      <Table.Td>{row.groups.groupID}</Table.Td>
      <Table.Td>{row.groups.title}</Table.Td>
      <Table.Td>{row.groups.registrationNumber}</Table.Td>
      <Table.Td>
      <Select
      w={'200px'}
      placeholder="Select Project Member"
      data={['Project Member', 'Project Coordinator', 'Examiner', 'Supervisor','Co-Supervisor']}
    />
      </Table.Td>
    </Table.Tr>
  ));

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <ScrollArea>
      <TextInput
        style={{paddingTop:'20px'}}
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        value={search}
        // onChange={handleSearchChange}
      />
      <Table horizontalSpacing="lg" verticalSpacing="lg" miw={900} layout="auto"  withColumnBorders>
        <Table.Tbody>
          <Table.Tr>
           
            <Table.Th
            >
              Group No
            </Table.Th>
            <Table.Th
             
            
            
            >
              Title
              </Table.Th>
            <Table.Th
             
            
              
            >
              Student Number
              </Table.Th>
            <Table.Th
             
             
              
            >
              Action
              </Table.Th>
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