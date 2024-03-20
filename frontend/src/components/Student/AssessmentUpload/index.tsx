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
    { assessmentName: "Proposal 1", Deadline: "30/03/2024 - 12.00AM", },
    { assessmentName: "Proposal 2", Deadline: "15/04/2024 - 12.00AM", },
    { assessmentName: "Proposal 3", Deadline: "30/04/2024 - 12.00AM", },

];

export const Assessment = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const icon = <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

    const rows = elements.map((element) => (
        <Table.Tr key={element.assessmentName}>
            <Table.Td>{element.assessmentName}</Table.Td>
            <Table.Td>{element.Deadline}</Table.Td>
            <Table.Td>
                <Center>
                    <Button
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                        onClick={open}
                    >
                        View assessment
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
                    Assessments need to be submitted
                </Text>
            </Center>

            <Modal opened={opened} onClose={close} title="Submit Assessment" size="55%">

                <div style={{ display: "flex", gap: 30, marginBottom: "40px" }}>
                    <TextInput
                        rightSectionPointerEvents="none"
                        label="Assessment Name"
                        placeholder="Proposal 1"
                        disabled
                    />

                </div>

                <div style={{ display: "flex", gap: 30 }}>
                    <TextInput
                        rightSectionPointerEvents="none"
                        label="Deadline "
                        placeholder="30/03/2024 - 12.00AM"
                        disabled
                    />

                </div>

                <div>
                    <Center>
                        <FileInput
                            rightSection={icon}
                            placeholder="Your Assessment"
                            rightSectionPointerEvents="none"
                            mt="50"
                            styles={{ input: { height: '100px', width: '600px' } }}
                        />
                    </Center>

                    <TextInput
                        mt={31}
                        rightSectionPointerEvents="none"
                        label="Comment"
                        styles={{ input: { width: '200px' } }}
                    />
                </div>


                <div style={{ marginLeft: "500px", display: "flex", gap: 10, }}>
                    <Button
                        variant="filled" color="red" radius="xl"

                    >
                        Remove
                    </Button>

                    <Button
                        variant="filled" color="rgba(0, 0, 0, 1)" radius="xl"

                    >
                        Submit
                    </Button>
                </div>


            </Modal>
            <ScrollArea>

                <Table
                    striped withColumnBorders
                    horizontalSpacing="ls"
                    verticalSpacing="xs"
                    style={{ tableLayout: "auto", width: "100%", marginTop: "60px" }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Assessment Name</Table.Th>
                            <Table.Th>Deadline</Table.Th>
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>


        </Container>
    )
}