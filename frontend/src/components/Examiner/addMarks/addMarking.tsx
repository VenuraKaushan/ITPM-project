
import {
    Table,
    ScrollArea,
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
import { useForm } from '@mantine/form';
import ExaminerAPI from '../../../API/examinerAPI';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export const ManageMarks = () => {

    const [opened, { open, close }] = useDisclosure(false);
    const icon = <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
    const [marksData, setMarksData] = useState<any>(null);

    // Declare add marks form
    const addMarkForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            _id: "",
            groupID: "",

            leaderName: "",
            leaderID: "",
            lProposal: "",
            lProgress1: "",
            lProgress2: "",
            lFinalPresentation: "",

            member1Name: "",
            member1ID: "",
            m1Proposal: "",
            m1Progress1: "",
            m1Progress2: "",
            m1FinalPresentation: "",

            member2Name: "",
            member2ID: "",
            m2Proposal: "",
            m2Progress1: "",
            m2Progress2: "",
            m2FinalPresentation: "",

            member3Name: "",
            member3ID: "",
            m3Proposal: "",
            m3Progress1: "",
            m3Progress2: "",
            m3FinalPresentation: "",

            leadercomment: "",
            m1comment: "",
            m2comment: "",
            m3comment: "",

        },
    });

    // Use react query and fetch research data
    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["researchData"],
        queryFn: () => ExaminerAPI.getResearchGroupByExaminer().then((res) => res.data),
    });

    useEffect(() => {
        if (!isLoading && data.length > 0 && addMarkForm.values._id !== '') {
            const fetchData = async () => {
                const marks = await fetchMarks(addMarkForm.values);
                if (marks !== null) {
                    setMarksData(marks); // Set marks data to state
                    open();
                }
            };
            fetchData();
        }
    }, [isLoading, data, addMarkForm.values, open]);


    const fetchMarks = async (values: any) => {
        try {
            const response = await ExaminerAPI.getMarksByGroupID(values._id);

            console.log(response.data.student)
            return response.data;
        } catch (error) {
            console.error('Error fetching marks:', error);
            return null;
        }
    };


    const submitMarks = (values: any) => {

        const marksID = marksData._id;

        const groupID = values._id;

        const student = marksData.student.map((student: any) => ({
            registrationNumber: student.registrationNumber,
            proposalMarks: values[`proposal_${student.registrationNumber}`],
            progress1Marks: values[`progress1_${student.registrationNumber}`],
            progress2Marks: values[`progress2_${student.registrationNumber}`],
            finalPresentationMarks: values[`finalPresentation_${student.registrationNumber}`],
            comments: values[`comments_${student.registrationNumber}`],
        }));

        const data = {
            student,
            groupID,
            marksID
        };

        showNotification({
            id: "Submit-Marks",
            color: "teal",
            title: "Submitting Marks",
            message: "Please wait while we submit your Marks..",
            icon: <IconCheck size={16} />,
            autoClose: 5000,
        });
        ExaminerAPI.submitMarks(data)
            .then((res) => {
                updateNotification({
                    id: "Submit-Marks",
                    color: "teal",
                    title: "Marks submitted successfully",
                    message: "Marks submitted successfully.",
                    icon: <IconCheck size={16} />,
                    autoClose: 5000,
                });

                addMarkForm.reset();
                close();
            })
            .catch((error) => {
                updateNotification({
                    id: "Submit-Marks",
                    color: "red",
                    title: "Something went wrong!!",
                    icon: <IconX />,
                    message: `An error occurred: ${error.response.data.message}`,
                    autoClose: 5000,
                });
            });
    }

    const rows = data.map((element: any) => (
        <Table.Tr key={element._id}>
            <Table.Td>{element.groupID}</Table.Td>
            <Table.Td>{element.title}</Table.Td>
            <Table.Td>
                <Center>
                    <Button
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                        onClick={async () => {
                            addMarkForm.setValues({
                                _id: element._id,
                                groupID: element.groupID,
                                leaderName: element.leader[0].name,
                                leaderID: element.leader[0].registrationNumber,
                                member1Name: element.members[0].name,
                                member1ID: element.members[0].registrationNumber,
                                member2Name: element.members[1].name,
                                member2ID: element.members[1].registrationNumber,
                                member3Name: element.members[2].name,
                                member3ID: element.members[2].registrationNumber,
                            });

                            await fetchMarks(addMarkForm.values);
                            open();

                        }}
                    >
                        Add Marks
                    </Button>
                </Center>
            </Table.Td>
        </Table.Tr>

    ));
   
    const modalRows = marksData && marksData.student
    ? marksData.student.map((student: any) => (
        <Table.Tr key={student._id}>
            <Table.Td>{student.registrationNumber}</Table.Td>
            <Table.Td>{student.registrationNumber}</Table.Td>
            <Table.Td>
                {student.proposalMarks !== "" ? (
                    <TextInput
                        {...addMarkForm.getInputProps(`proposal_${student.registrationNumber}`)}
                        defaultValue={student.proposalMarks}
                    />
                ) : (
                    <TextInput
                        {...addMarkForm.getInputProps(`proposal_${student.registrationNumber}`)}
                        placeholder="Enter Proposal Marks"
                    />
                )}
            </Table.Td>
            <Table.Td>
                {student.progress1Marks !== "" ? (
                    <TextInput
                        {...addMarkForm.getInputProps(`progress1_${student.registrationNumber}`)}
                        defaultValue={student.progress1Marks}
                    />
                ) : (
                    <TextInput
                        {...addMarkForm.getInputProps(`progress1_${student.registrationNumber}`)}
                        placeholder="Enter Progress 1 Marks"
                    />
                )}
            </Table.Td>
            <Table.Td>
                {student.progress2Marks !== "" ? (
                    <TextInput
                        {...addMarkForm.getInputProps(`progress2_${student.registrationNumber}`)}
                        defaultValue={student.progress2Marks}
                    />
                ) : (
                    <TextInput
                        {...addMarkForm.getInputProps(`progress2_${student.registrationNumber}`)}
                        placeholder="Enter Progress 2 Marks"
                    />
                )}
            </Table.Td>
            <Table.Td>
                {student.finalPresentationMarks !== "" ? (
                    <TextInput
                        {...addMarkForm.getInputProps(`finalPresentation_${student.registrationNumber}`)}
                        defaultValue={student.finalPresentationMarks}
                    />
                ) : (
                    <TextInput
                        {...addMarkForm.getInputProps(`finalPresentation_${student.registrationNumber}`)}
                        placeholder="Enter Final Presentation Marks"
                    />
                )}
            </Table.Td>
            <Table.Td>
                {student.comments !== "" ? (
                    <TextInput
                        {...addMarkForm.getInputProps(`comments_${student.registrationNumber}`)}
                        defaultValue={student.comments}
                    />
                ) : (
                    <TextInput
                        {...addMarkForm.getInputProps(`comments_${student.registrationNumber}`)}
                        placeholder="Enter Comments"
                    />
                )}
            </Table.Td>
        </Table.Tr>
    ))
    : data.length === 0
    ? (
        <Table.Tr>
            <Table.Td colSpan={7}>No data available</Table.Td>
        </Table.Tr>
    )
    : null;



console.log(addMarkForm.values)

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

            <Modal opened={opened} onClose={close} title="Add Marks" size="80%">

                <div style={{ display: "flex", gap: 30, marginBottom: "40px" }}>
                    <TextInput
                        fw={500}
                        {...addMarkForm.getInputProps("groupID")}
                        disabled
                    >
                    </TextInput>

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
                            <Table.Th>Add Comment</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{modalRows}</Table.Tbody>
                </Table>
                <Button
                    ml={940}
                    variant="filled"
                    color="red"
                    radius="xl"
                    onClick={() => submitMarks(addMarkForm.values)}
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
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>


        </Container>
    )
}