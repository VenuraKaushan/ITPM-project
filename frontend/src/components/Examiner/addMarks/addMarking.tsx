
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
        // Check if data has been loaded and if there is data to fetch marks for
        if (!isLoading && data.length > 0 && addMarkForm.values._id !== "") {
            // Fetch marks data when the component mounts
            const fetchData = async () => {
                const marksData = await fetchMarks(addMarkForm.values);
                if (marksData !== null) {
                    open(); // Open the modal after marks data is fetched
                }
            };
            fetchData();
        }
    }, [isLoading, data, addMarkForm.values, open]);


    const fetchMarks = async (values:any) => {
        try {
            const response = await ExaminerAPI.getMarksByGroupID(values._id);
            const marksData = response.data; 

            console.log(marksData)
            return marksData;
        } catch (error) {
            console.error('Error fetching marks:', error);
            return null;
        }
    };

    
    const submitMarks = (marks: any) => {

        const groupID = marks._id;

        const proposalMarks = [
            { registrationNumber: marks.leaderID, marks: marks.lProposal },
            { registrationNumber: marks.member1ID, marks: marks.m1Proposal },
            { registrationNumber: marks.member2ID, marks: marks.m2Proposal },
            { registrationNumber: marks.member3ID, marks: marks.m3Proposal }
        ];

        const progress1Marks = [
            { registrationNumber: marks.leaderID, marks: marks.lProgress1 },
            { registrationNumber: marks.member1ID, marks: marks.m1Progress1 },
            { registrationNumber: marks.member2ID, marks: marks.m2Progress1 },
            { registrationNumber: marks.member3ID, marks: marks.m3Progress1 }
        ];

        const progress2Marks = [
            { registrationNumber: marks.leaderID, marks: marks.lProgress2 },
            { registrationNumber: marks.member1ID, marks: marks.m1Progress2 },
            { registrationNumber: marks.member2ID, marks: marks.m2Progress2 },
            { registrationNumber: marks.member3ID, marks: marks.m3Progress2 }
        ];

        const finalPresentationMarks = [
            { registrationNumber: marks.leaderID, marks: marks.lFinalPresentation },
            { registrationNumber: marks.member1ID, marks: marks.m1FinalPresentation },
            { registrationNumber: marks.member2ID, marks: marks.m2FinalPresentation },
            { registrationNumber: marks.member3ID, marks: marks.m3FinalPresentation }
        ];

        const comments = [
            { registrationNumber: marks.leaderID, comment: marks.leadercomment },
            { registrationNumber: marks.member1ID, comment: marks.m1comment },
            { registrationNumber: marks.member2ID, comment: marks.m2comment },
            { registrationNumber: marks.member3ID, comment: marks.m3comment }
        ];

        const data = {
            proposalMarks,
            progress1Marks,
            progress2Marks,
            finalPresentationMarks,
            comments,
            groupID
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

                    const marksData = await fetchMarks(addMarkForm.values);
                    if (marksData == null) {
                        open();
                    }
                }}
            >
                Add Marks
            </Button>
        </Center>
    </Table.Td>
</Table.Tr>

    ));
    console.log(addMarkForm.values);

    const modalRows = (
        <>
            <Table.Tr>
                <Table.Td>{addMarkForm.values.leaderID}</Table.Td>
                <Table.Td>{addMarkForm.values.leaderName}</Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("lProposal")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("lProgress1")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("lProgress2")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("lFinalPresentation")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("leadercomment")}
                    />
                </Table.Td>
                {/* <Table.Td>
                    <Button
                        variant="filled"
                        color="red"
                        radius="xl"
                        onClick={() => submitMarks(addMarkForm.values)} >
                        Submit Marks
                    </Button>
                </Table.Td> */}
            </Table.Tr>

            <Table.Tr>
                <Table.Td>{addMarkForm.values.member1ID}</Table.Td>
                <Table.Td>{addMarkForm.values.member1Name}</Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("m1Proposal")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("m1Progress1")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("m1Progress2")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("m1FinalPresentation")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("m1comment")}
                    />
                </Table.Td>
            </Table.Tr>

            <Table.Tr>
                <Table.Td>{addMarkForm.values.member2ID}</Table.Td>
                <Table.Td>{addMarkForm.values.member2Name}</Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("m2Proposal")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("m2Progress1")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("m2Progress2")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("m2FinalPresentation")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("m2comment")}
                    />
                </Table.Td>

            </Table.Tr>

            <Table.Tr>
                <Table.Td>{addMarkForm.values.member3ID}</Table.Td>
                <Table.Td>{addMarkForm.values.member3Name}</Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("m3Proposal")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("m3Progress1")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("m3Progress2")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("m3FinalPresentation")}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        {...addMarkForm.getInputProps("m3comment")}
                    />
                </Table.Td>
            </Table.Tr>
        </>
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