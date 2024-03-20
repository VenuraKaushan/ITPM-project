import {
    Table,
    ScrollArea,
    Text,
    Container,
    Center,


} from '@mantine/core';




const elements = [
    { presentation1: "76", report1: "91",document: "80" },
];

export const Semester1Marks = () => {

    const rows = elements.map((element) => (
        <Table.Tr key={element.presentation1}>
            <Table.Td>{element.presentation1}</Table.Td>
            <Table.Td>{element.report1}</Table.Td>
            <Table.Td>{element.document}</Table.Td>


        </Table.Tr>
    ));

    return (
        <Container>
            <Center style={{ marginTop: "20px" }}>
                <Text
                    size="lg"
                    fw={700}
                >
                    1st Semester Marks 
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
                            <Table.Th>Proposa l and Progress 1 presentations</Table.Th>
                            <Table.Th>Status report 1</Table.Th>
                            <Table.Th>Proposal document</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </Container>
    )

}