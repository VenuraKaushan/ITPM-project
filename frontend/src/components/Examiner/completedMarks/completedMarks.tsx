
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
import { useQuery } from "@tanstack/react-query";
import ExaminerAPI from '../../../API/examinerAPI';
import { useForm } from '@mantine/form';


export const CompletedMarks = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const icon = <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

    const marksForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            _id: "",
            cusGroupNo: "",
            leaderNo: "",
            leaderProposal: "",
            leaderProgress1: "",
            leaderProgress2: "",
            leaderFinal: "",

            m1No: "",
            m1Proposal: "",
            m1Progress1: "",
            m1Progress2: "",
            m1Final: "",

            m2No: "",
            m2Proposal: "",
            m2Progress1: "",
            m2Progress2: "",
            m2Final: "",

            m3No: "",
            m3Proposal: "",
            m3Progress1: "",
            m3Progress2: "",
            m3Final: "",
        },
    });

    // Use react query and fetch research data
    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["groupMarks"],
        queryFn: () => ExaminerAPI.getGroupMarksByExaminer().then((res) => res.data),
    });

    // Filter relevant research groups' data
    const relevantData = data.filter((element: any) => element._id == marksForm.values._id)
    console.log(data)
    const rows = data.map((element: any) => (
        <Table.Tr key={element._id}>
            <Table.Td>{element.cusGroupNo}</Table.Td>
            <Table.Td>{element.Title}</Table.Td>
            <Table.Td>
                <Center>
                    <Button
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                        onClick={() => {
                            marksForm.setValues({
                                _id: element._id,
                                cusGroupNo: element.cusGroupNo,
                                leaderNo: element.student[0].registrationNumber,
                                leaderProposal: element.student[0].proposalMarks,
                                leaderProgress1: element.student[0].progress1Marks,
                                leaderProgress2: element.student[0].progress2Marks,
                                leaderFinal: element.student[0].finalPresentationMarks,

                                m1No: element.student[1].registrationNumber,
                                m1Proposal: element.student[1].proposalMarks,
                                m1Progress1: element.student[1].progress1Marks,
                                m1Progress2: element.student[1].progress2Marks,
                                m1Final: element.student[1].finalPresentationMarks,

                                m2No: element.student[2].registrationNumber,
                                m2Proposal: element.student[2].proposalMarks,
                                m2Progress1: element.student[2].progress1Marks,
                                m2Progress2: element.student[2].progress2Marks,
                                m2Final: element.student[2].finalPresentationMarks,

                                m3No: element.student[2].registrationNumber,
                                m3Proposal: element.student[2].proposalMarks,
                                m3Progress1: element.student[2].progress1Marks,
                                m3Progress2: element.student[2].progress2Marks,
                                m3Final: element.student[2].finalPresentationMarks,
                            })
                            open()
                        }}

                    >
                        View Marks
                    </Button>
                </Center>
            </Table.Td>


        </Table.Tr>
    ));

    console.log(marksForm.values)

    const modalRows = relevantData.map((element: any) =>
        element.student.map((student: any) => (
            <Table.Tr key={student._id}>
                <Table.Td>{student.registrationNumber}</Table.Td>
                <Table.Td>{student.proposalMarks}</Table.Td>
                <Table.Td>{student.progress1Marks}</Table.Td>
                <Table.Td>{student.progress2Marks}</Table.Td>
                <Table.Td>{student.finalPresentationMarks}</Table.Td>
            </Table.Tr>
        ))
    );


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

            </Center>

            <Modal opened={opened} onClose={close} title="View Marks" size="65%">

                <div style={{ display: "flex", gap: 30, marginBottom: "40px" }}>
                    <TextInput
                        fw={500}
                        {...marksForm.getInputProps("cusGroupNo")}
                        disabled
                    >
                    </TextInput>

                </div>

                <Table
                    mb={50}
                    striped withColumnBorders
                    horizontalSpacing="ls"
                    verticalSpacing="xs"
                    style={{ tableLayout: "auto", width: "100%", marginTop: "20px" }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Student Number</Table.Th>
                            <Table.Th>Proposal</Table.Th>
                            <Table.Th>Progress 1</Table.Th>
                            <Table.Th>Progress 2</Table.Th>
                            <Table.Th>Final Presentation</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{modalRows}</Table.Tbody>
                </Table>


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
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>


        </Container>
    )
}