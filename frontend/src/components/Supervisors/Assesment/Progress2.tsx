import {
    Table,
    ScrollArea,
    Text,
    Container,
    Center,
    Modal,
    TextInput,
    Button,
    FileInput,
    rem
  
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  import { IconFileCv } from '@tabler/icons-react';
  
  
  
  const elements = [
    { groupnumber: "It21233876", leaderno: "shehan", topic:" battry project", },
    { groupnumber: "IT21223686", leaderno: "Vinnath", topic:" Bank project", },
    { groupnumber: "IT21546578", leaderno: "sahan", topic:" Tution project", },
  
  
  
  ];
  
  export const Progress2 = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const icon = <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
  
    const rows = elements.map((element) => (
        <Table.Tr key={element.groupnumber}>
            <Table.Td>{element.groupnumber}</Table.Td>
            <Table.Td>{element.leaderno}</Table.Td>
            <Table.Td>{element.topic}</Table.Td>
            <Table.Td>
                <Center>
                    <Button
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                        onClick={open}
                    >
                        Download
                    </Button>
                </Center>
            </Table.Td>
  
  
        </Table.Tr>
    ));
  
    return (
        <Container>
            <Center style={{ marginTop: "20px" }}>
                <Text
                    size="lg"
                    fw={700}
                >
                    View Marks
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
                        <Table.Th>Group Number</Table.Th>
                        <Table.Th>Leader Register Number</Table.Th>
                        <Table.Th>Topic</Table.Th>
                        <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
  
  
        </Container>
    )
  }