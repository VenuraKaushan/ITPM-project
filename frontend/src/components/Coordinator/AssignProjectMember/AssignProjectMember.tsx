import { useState } from 'react';
import {
  Table,
  ScrollArea,

  Text,
  TextInput,
  rem,
  keys,
  Button,
} from '@mantine/core';
import {  IconSearch } from '@tabler/icons-react';
import { Select } from '@mantine/core';
import CoordinatorAPI from '../../../API/coordinatorAPI/coordinator.api';
import { useQuery } from "@tanstack/react-query";


export function AssignProjectMember() {

  //use react query and fetch Group data
  const { data = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["GroupData"],
    queryFn: () =>
      CoordinatorAPI.getGroupDetails().then((res) => res.data),

  });
  console.log(data);


  if (isLoading) {
    return <div>Loading....</div>;
  }

  // //   // Combine project members from all groups into a single array
  //   const allProjectMembers = data.reduce(
  //     (acc:any, item:any) => acc.concat(item.members),
  //     []
  //   );

  //    // Filter project members by role and extract their names
  // const projectMemberNames = allProjectMembers
  // .filter((member: any) => member.role === 'PROJECTMEMBER')
  // .map((member: any) => member.name);

  // console.log(projectMemberNames)
  const rows = data.map((item: any ,index:number) => (

    <Table.Tr key={`${item.groupID}-${index}`}>
      
      <Table.Td>{item.groupID}</Table.Td>
      <Table.Td>{item.title}</Table.Td>
      <Table.Td>
        {item.leader && item.leader.map((leader: any) => (
          <span key={leader._id}>
            {leader.registrationNumber}
          </span>
        ))}
        <br />
        {item.members && item.members.map((member: any) => (
          <span key={member._id}>
            {member.registrationNumber}
            <br />
          </span>
        ))}

      </Table.Td>
      <Table.Td>
        <Select
          w={'200px'}
          placeholder="Select Project Member"
          data={
            item.members 
            ? item.members
                .filter((member: any) => member.role === 'PROJECTMEMBER')
                .map((member: { name: string }) => member.name) 
            : []
          }
          
        />
      </Table.Td>
      <Table.Td>
        <Button>Submit</Button>
      </Table.Td>
    </Table.Tr>
  ));

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
     
      />
      <Table horizontalSpacing="lg" verticalSpacing="lg" miw={900} layout="auto" withColumnBorders>
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
              Select Project Member
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