import {
    Table,
    ScrollArea,
    Text,
  
} from '@mantine/core';


const elements = [
    { registrationNo:" JUN_WE_001", title: "VD room", description: 'test description', category: 'Fasion',members: 4  },
   
];

export function PublishResearch() {
    const rows = elements.map((element) => (
        <Table.Tr key={element.registrationNo}>
            <Table.Td>{element.registrationNo}</Table.Td>
            <Table.Td>{element.title}</Table.Td>
            <Table.Td>{element.description}</Table.Td>
            <Table.Td>{element.category}</Table.Td>
            <Table.Td>{element.members}</Table.Td>

        </Table.Tr>
    ));

    return (
        <div style={{ position: "absolute", marginLeft: "-200px", marginRight: "100px" }}>
            <Text
                size="lg"
                fw={700}
                style={{ position: "relative", top: 20, right: -450 }}
            >
                RESEARCHES
            </Text>
            <ScrollArea>

                <Table mt="100px" w="1000px">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Registration No</Table.Th>
                            <Table.Th>Title</Table.Th>
                            <Table.Th>Description</Table.Th>
                            <Table.Th>Category</Table.Th>
                            <Table.Th>No of Members</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </div>
    );
}