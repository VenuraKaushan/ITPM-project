import {
    Table,
    ScrollArea,
    Text,
    Container,
    Center

} from '@mantine/core';


const elements = [
    { registrationNo: " JUN_WE_001", title: "VD room", category: 'Fasion', members: 4 },

];

export function PublishResearch() {
    const rows = elements.map((element) => (
        <Table.Tr key={element.registrationNo}>
            <Table.Td>{element.registrationNo}</Table.Td>
            <Table.Td>{element.title}</Table.Td>
            <Table.Td>{element.category}</Table.Td>
            <Table.Td>{element.members}</Table.Td>

        </Table.Tr>
    ));

    return (
        <Container>
            <Center style={{marginTop:"20px"}}>
            <Text
                size="lg"
                fw={700}
            >
                RESEARCHES
            </Text>
            </Center>
            <ScrollArea>

                <Table mt="100px" w="890px" h="100px">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Registration No</Table.Th>
                            <Table.Th>Title</Table.Th>
                            <Table.Th>Category</Table.Th>
                            <Table.Th>No of Members</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </Container>
    );
}