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
    { studentnumber: "It21233876", studentname: "shehan", Proposal:" 50", Progress1:"60", Progress2:"55", FinalPresentation:"60", },
    { studentnumber: "IT21225687", studentname: "vinnath", Proposal:" 43", Progress1:"65", Progress2:"23", FinalPresentation:"62", },
    { studentnumber: "IT21657456", studentname: "sahan", Proposal:" 78", Progress1:"50", Progress2:"46", FinalPresentation:"73", },



];


const elements2 = [
    { studentnumber: "It21233876", studentname: "shehan" },
    { studentnumber: "It21233576", studentname: "vinnath" },
    { studentnumber: "It21238876", studentname: "sahan" },


];

export const FeedBack = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const icon = <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

    const rows = elements.map((element) => (
        <Table.Tr key={element.studentnumber}>
            <Table.Td>{element.studentnumber}</Table.Td>
            <Table.Td>{element.studentname}</Table.Td>
            <Table.Td>{element.Proposal}</Table.Td>
            <Table.Td>{element.Progress1}</Table.Td>
            <Table.Td>{element.Progress2}</Table.Td>
            <Table.Td>{element.FinalPresentation}</Table.Td>
            <Table.Td>
                <Center>
                    <Button
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                        onClick={open}
                    >
                        Edit
                    </Button>
                </Center>
            </Table.Td>


        </Table.Tr>
    ));




    const modalRows = elements2.map((element) => (
        <Table.Tr key={element.studentnumber}>
            <Table.Td>{element.studentnumber}</Table.Td>
            <Table.Td>{element.studentname}</Table.Td>
            <Table.Td>
                <TextInput>

                </TextInput>
            </Table.Td>

            <Table.Td>
                <TextInput
                    disabled
                >

                </TextInput>
            </Table.Td>

            <Table.Td>
                <TextInput
                    disabled
                >

                </TextInput>
            </Table.Td>

            <Table.Td>
                <TextInput
                    disabled
                >

                </TextInput>
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


                <Modal opened={opened} onClose={close} title="Edit" size="65%">

                    <div style={{ display: "flex", gap: 30, marginBottom: "40px" }}>
                        <Text fw={500}>
                            VD Room - Y4_RSR_GRP-1
                        </Text>

                    </div>

                    <Table
                        striped withColumnBorders
                        horizontalSpacing="ls"
                        verticalSpacing="xs"
                        style={{ tableLayout: "auto", width: "100%", marginTop: "20px" }}
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Student Number</Table.Th>
                                <Table.Th>Student Name</Table.Th>
                                <Table.Th>Proposal</Table.Th>
                                <Table.Th>Progress 1</Table.Th>
                                <Table.Th>Progress 2</Table.Th>
                                <Table.Th>Final Presentation</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{modalRows}</Table.Tbody>
                    </Table>

                    <TextInput
                        mt={30}
                        label="Add Comment"
                        styles={{ input: { height: '50px', width: '400px' } }}
                    >

                    </TextInput>

                    <Button
                        ml={730}
                        mt={50}
                        variant="filled"
                        color="red"
                        radius="xl"
                    >
                        Submit Marks
                    </Button>

                </Modal>

                <Table
                    striped withColumnBorders
                    horizontalSpacing="ls"
                    verticalSpacing="xs"
                    style={{ tableLayout: "auto", width: "100%", marginTop: "60px" }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Student Number</Table.Th>
                            <Table.Th>Student Name</Table.Th>
                            <Table.Th>Proposal</Table.Th>
                            <Table.Th>Progress 1</Table.Th>
                            <Table.Th>Progress 2</Table.Th>
                            <Table.Th>Final Presentation</Table.Th>
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>


        </Container>
    )
}