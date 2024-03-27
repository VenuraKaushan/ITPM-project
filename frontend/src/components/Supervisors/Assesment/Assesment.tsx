
import {
    Table,
    ScrollArea,
    Text,
    Container,
    Center,
    Modal,
    TextInput,
    Button,
    rem

} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconFileCv,
    IconSearch,
} from '@tabler/icons-react';


const elements = [
    { groupNumber: "Y4_RSR_GRP-1", title: "VD room", date: "30/03/2024", time: "10.30 AM" },
    { groupNumber: "Y4_RSR_GRP-2", title: "VD room", date: "30/03/2024", time: "11.00 AM" },
    { groupNumber: "Y4_RSR_GRP-3", title: "VD room", date: "30/03/2024", time: "11.30 AM" },

];

const elements2 = [
    { StudentNumber: "IT21211928", StudentName: "Venura" },
    { StudentNumber: "IT21334244", StudentName: "Vinnath" },
    { StudentNumber: "IT23431112", StudentName: "Sahan" },
    { StudentNumber: "IT23431352", StudentName: "Shehan" },


];
export const Assesment = () => {

    const [opened, { open, close }] = useDisclosure(false);
    const icon = <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

    const rows = elements.map((element) => (
        <Table.Tr key={element.groupNumber}>
            <Table.Td>{element.groupNumber}</Table.Td>
            <Table.Td>{element.title}</Table.Td>
            <Table.Td>{element.date}</Table.Td>
            <Table.Td>{element.time}</Table.Td>
            <Table.Td>
                <Center>
                    <Button
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                        onClick={open}
                    >
                        Add Marks
                    </Button>
                </Center>
            </Table.Td>


        </Table.Tr>
    ));

    const modalRows = elements2.map((element) => (
        <Table.Tr key={element.StudentNumber}>
            <Table.Td>{element.StudentNumber}</Table.Td>
            <Table.Td>{element.StudentName}</Table.Td>
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
            <Center style={{ marginTop: "70px" }}>
                <TextInput
                    placeholder="Search by any field"
                    style={{
                        width: "calc(80% - 60px)",
                        marginRight: "10px",
                        display: "inline-block",
                    }}
                    leftSection={
                        <IconSearch
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    }
                //   value={search}
                //   onChange={handleSearchChange}
                />

                <Button
                    variant="gradient"
                    gradient={{ from: 'red', to: 'violet', deg: 90 }}
                    style={{
                        width: "160px",
                        display: "inline-block",
                        marginLeft: "50px",

                    }}
                >
                    Download Rubrics
                </Button>
            </Center>

            <Modal opened={opened} onClose={close} title="Add Marks" size="65%">

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
            <ScrollArea>

                <Table
                    striped withColumnBorders
                    horizontalSpacing="ls"
                    verticalSpacing="xs"
                    style={{ tableLayout: "auto", width: "100%", marginTop: "20px" }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Group Number</Table.Th>
                            <Table.Th>Title</Table.Th>
                            <Table.Th>Date</Table.Th>
                            <Table.Th>Time</Table.Th>
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>


        </Container>
    )
}