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
import { useQuery } from "@tanstack/react-query";
import StudentAPI from '../../../API/studentAPI/student.api';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const Assessment = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const icon = <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
    const [file, setFile] = useState("");
    const [fileRes, setFileRes] = useState('');


    const handleFileChange = (file: any) => {
        setFile(file);
    };

    useEffect(() => {
        if (file) {
            handleUpload();
        }
    }, [file]);

    // Declare submit assessment form
    const submitAssessmentForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            _id: '',
            assessmentName: "",
            deadline: "",
            submitDoc: "",
            comment: "",
        },
    });

    // Use react query and fetch research data
    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["assessmentData"],
        queryFn: () => StudentAPI.getAllAssessment().then((res) => res.data),
    });


    //submit assessment function
    const submitAssessment = async (values: {
        _id: String,
        submitDoc: string,
        comment: String
    }) => {
        showNotification({
            id: "Submit-Assessment",
            color: "teal",
            title: "Submitting Assessment",
            message: "Please wait while we submit your Assessment..",
            icon: <IconCheck size={16} />,
            autoClose: 5000,
        });

        StudentAPI.submitAssessment(values)
            .then((res) => {
                updateNotification({
                    id: "Submit-Assessment",
                    color: "teal",
                    icon: <IconCheck />,
                    title: "Assessment submitted successfully",
                    message: "Assessment submitted successfully.",
                    // icon: <IconCheck />,
                    autoClose: 5000,
                });

                submitAssessmentForm.reset();
                close();

                refetch();

            })
            .catch((error) => {
                updateNotification({
                    id: "Submit-Assessment",
                    color: "red",
                    title: "Something went wrong!!",
                    icon: <IconX />,
                    message: `An error occurred: ${error.response.data.message}`,
                    // icon: <IconAlertTriangle />,
                    autoClose: 5000,
                });
            });

    }

    //handle file upload
    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            // Make HTTP request to backend API to upload file
            const response = await axios.post('http://localhost:3001/api/upload/assessment/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Call submitAssessment with response data after successful upload
            submitAssessment({
                ...submitAssessmentForm.values,
                submitDoc: response.data,
            });

        } catch (err) {
            console.error('Error uploading file:', err);

        }
    }

    const rows = data.map((element: any) => (
        <Table.Tr key={element._id}>
            <Table.Td>{element.assestmentName}</Table.Td>
            <Table.Td>{element.deadline}</Table.Td>
            <Table.Td>{element.quesDoc}</Table.Td>
            <Table.Td>
                <Center>
                    <Button
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                        onClick={() => {
                            open()
                            submitAssessmentForm.setValues({
                                _id: element._id,
                                assessmentName: element.assestmentName,
                                deadline: element.deadline,
                            })
                        }}

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
                <form onSubmit={submitAssessmentForm.onSubmit((values) => submitAssessment(values))}>

                    <div style={{ display: "flex", gap: 30, marginBottom: "40px" }}>
                        <TextInput
                            rightSectionPointerEvents="none"
                            label="Assessment Name"
                            disabled
                            {...submitAssessmentForm.getInputProps("assessmentName")}

                        />

                    </div>

                    <div style={{ display: "flex", gap: 30 }}>
                        <TextInput
                            rightSectionPointerEvents="none"
                            disabled
                            {...submitAssessmentForm.getInputProps("deadline")}

                        />

                    </div>

                    <div>
                        <TextInput
                            mt={31}
                            rightSectionPointerEvents="none"
                            label="Comment"
                            styles={{ input: { width: '200px' } }}
                            {...submitAssessmentForm.getInputProps("comment")}

                        />
                        <Center>
                            <FileInput
                                rightSection={icon}
                                placeholder="Your Assessment"
                                rightSectionPointerEvents="none"
                                mt="30"
                                styles={{ input: { height: '100px', width: '600px' } }}
                                onChange={handleFileChange}


                            />
                        </Center>


                    </div>


                    <div style={{ marginLeft: "500px", display: "flex", gap: 10,marginTop:"20px" }}>
                        <Button
                            variant="filled" color="red" radius="xl"
                            onClick={() => submitAssessmentForm.reset()}
                        >
                            Remove
                        </Button>

                        <Button
                            variant="filled" color="rgba(0, 0, 0, 1)" radius="xl"
                            type='submit'
                        >
                            Submit
                        </Button>
                    </div>
                </form>

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
                            <Table.Th>Document</Table.Th>
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>


        </Container>
    )
}