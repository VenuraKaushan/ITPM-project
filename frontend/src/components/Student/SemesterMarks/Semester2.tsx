import {
    Table,
    ScrollArea,
    Text,
    Container,
    Center,
} from '@mantine/core';



const elements = [
    { presentation2: "76", finalPresentation: "91",report2: "80", logbook:"78", website:"66",finalThesis:"81" },
];

export const Semester2Marks = () =>{
   

    const rows = elements.map((element) => (
        <Table.Tr key={element.presentation2}>
            <Table.Td>{element.presentation2}</Table.Td>
            <Table.Td>{element.finalPresentation}</Table.Td>
            <Table.Td>{element.report2}</Table.Td>
            <Table.Td>{element.logbook}</Table.Td>
            <Table.Td>{element.website}</Table.Td>
            <Table.Td>{element.finalThesis}</Table.Td>

        </Table.Tr>
    ));

    return (
        <Container>
            <Center style={{ marginTop: "20px" }}>
                <Text
                    size="lg"
                    fw={700}
                >
                    2nd Semester Marks 
                </Text>
            </Center>
            <ScrollArea>

                <Table
                    striped withColumnBorders
                    horizontalSpacing="ls"
                    verticalSpacing="xs"
                    style={{ tableLayout: "auto", width: "100%", marginTop: "60px" }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Progress 2 presentation</Table.Th>
                            <Table.Th>Final Presentation</Table.Th>
                            <Table.Th>Status report 2</Table.Th>
                            <Table.Th> log book</Table.Th>
                            <Table.Th>Website</Table.Th>
                            <Table.Th>Final thesis</Table.Th>

                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </Container>
    )
}