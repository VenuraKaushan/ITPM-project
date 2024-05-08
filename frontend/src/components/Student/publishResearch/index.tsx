import React, { useState } from 'react'; // Import useState
import {
    Table,
    ScrollArea,
    Text,
    Container,
    Center,
    Modal,
    TextInput,
    Button,
    Textarea,
    Group,
    rem
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUpload, IconPhoto, IconX, IconCheck } from '@tabler/icons-react';
import {
    Dropzone,
    IMAGE_MIME_TYPE,
    FileWithPath,
} from '@mantine/dropzone';
import { useQuery } from "@tanstack/react-query";
import StudentAPI from '../../../API/studentAPI/student.api';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import axios from 'axios';

export function PublishResearch() {
    const [opened, { open, close }] = useDisclosure(false);
    const [files, setFiles] = useState<FileWithPath[]>([]);

    //get logged user session data
    const user = JSON.parse(localStorage.getItem("user-student-session") || "{}");

    console.log(user)
    // Declare publish research form
    const publishReseach = useForm({
        validateInputOnChange: true,
        initialValues: {
            _id: "",
            groupID: "",
            leaderName: "",
            member1Name: "",
            member2Name: "",
            member3Name: "",
            supervisorName: "",
            coSupervisorName: "",
            title: "",
            hindex: "",
            scopusIndexing: "",
        },
    });

    console.log(files)
    // Use react query and fetch research data
    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["researchData"],
        queryFn: () => StudentAPI.getResearch(user).then((res) => res.data),
    });


    const handleScan = async () => {
        if (!files.length) {
            console.error('No image selected');
            return;
        }

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`image`, file);
        });

        await axios.post('http://localhost:3001/apist/upload/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                if (res.data.isPaymentSuccessful) {
                    researchPublish({
                        ...publishReseach.values,
                        image: res.data.image
                    });
                } else {
                    showNotification({
                        id: "Publish-Research",
                        color: "red",
                        title: "Something went wrong!!",
                        message: "The provided photo is not valid",
                        icon: <IconCheck size={16} />,
                        autoClose: 5000,
                    });
                }
            })


            .catch((error) => {
                console.error(error);

            })

    };


    const researchPublish = async (values: {
        _id: string,
        image: string,
        hindex: string,
        scopusIndexing: string
    }) => {
        console.log(values)
        showNotification({
            id: "Publish-Research",
            color: "teal",
            title: "Publish Research",
            message: "Please wait while we publish your Research..",
            icon: <IconCheck size={16} />,
            autoClose: 5000,
        });

        StudentAPI.researchPublish(values)
            .then((res) => {
                updateNotification({
                    id: "Publish-Research",
                    color: "teal",
                    icon: <IconCheck />,
                    title: "Research successfully Published",
                    message: "Research successfully Published.",
                    // icon: <IconCheck />,
                    autoClose: 5000,
                });

                publishReseach.reset();
                close();

            })
            .catch((error) => {
                updateNotification({
                    id: "Publish-Research",
                    color: "red",
                    title: "Something went wrong!!",
                    icon: <IconX />,
                    message: `An error occurred: ${error.response.data.message}`,
                    // icon: <IconAlertTriangle />,
                    autoClose: 5000,
                });
            });

    }



    const rows = data.map((element: any) => (
        <Table.Tr key={element._id}>
            <Table.Td>{element.groupID}</Table.Td>
            <Table.Td>{element.title}</Table.Td>
            <Table.Td>{element.category}</Table.Td>
            <Table.Td>{element.members.length + element.leader.length}</Table.Td>
            <Table.Td>
                <Center>
                    <Button
                        onClick={() => {
                            publishReseach.setValues({
                                _id: element._id,
                                groupID: element.groupID,
                                leaderName: element.leader[0].name,
                                member1Name: element.members[0].name,
                                member2Name: element.members[1].name,
                                member3Name: element.members[2].name,
                                supervisorName: element.supervisorName,
                                coSupervisorName: element.coSupervisorName,
                                title: element.title,
                            })
                            open();
                        }}
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                    >
                        Publish
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
                    RESEARCHES
                </Text>
            </Center>
            <Modal opened={opened} onClose={close} title="Publish Research" size="70%">
                <Textarea fw={500}
                    {...publishReseach.getInputProps("groupID")}
                    disabled

                >
                </Textarea>

                <Text fw={500} style={{ marginTop: "40px" }}>
                    Group Members
                </Text>

                <div style={{ display: "flex", gap: 30 }}>
                    <TextInput
                        rightSectionPointerEvents="none"
                        label="Leader Name"
                        disabled
                        {...publishReseach.getInputProps("leaderName")}

                    />
                    <TextInput
                        rightSectionPointerEvents="none"
                        label="Member Name"
                        disabled
                        {...publishReseach.getInputProps("member1Name")}
                    />
                    <TextInput
                        rightSectionPointerEvents="none"
                        label=" Member Name"
                        disabled
                        {...publishReseach.getInputProps("member2Name")}

                    />

                    <TextInput
                        rightSectionPointerEvents="none"
                        label="Member Name"
                        disabled
                        {...publishReseach.getInputProps("member3Name")}

                    />
                </div>

                <Text fw={500} style={{ marginTop: "30px" }}>
                    Supervisors
                </Text>
                <div style={{ display: "flex", gap: 30 }}>
                    <TextInput
                        rightSectionPointerEvents="none"
                        label="Supervisor"
                        disabled
                        {...publishReseach.getInputProps("supervisorName")}

                    />

                    <TextInput
                        rightSectionPointerEvents="none"
                        label="Co-Supervisor"
                        disabled
                        {...publishReseach.getInputProps("coSupervisorName")}

                    />

                </div>

                <div style={{ display: "flex", gap: 30, marginTop: "20px" }}>

                    <Text fw={500} style={{ marginTop: "30px" }}>
                        Name of the conference or journal
                    </Text>

                    <TextInput
                        style={{ marginTop: "25px" }}
                        rightSectionPointerEvents="none"
                        disabled
                        {...publishReseach.getInputProps("title")}
                    />
                </div>

                <div style={{ display: "flex", gap: 30, marginTop: "20px" }}>

                    <Text fw={500} style={{ marginTop: "30px" }} >
                        Link for view H-index
                    </Text>

                    <TextInput
                        style={{ marginTop: "25px" }}
                        rightSectionPointerEvents="none"
                        {...publishReseach.getInputProps("hindex")}

                    />

                    <Text fw={500} style={{ marginTop: "30px" }}>
                        Link for  verify the Scopus indexing
                    </Text>

                    <TextInput
                        style={{ marginTop: "25px" }}
                        rightSectionPointerEvents="none"
                        {...publishReseach.getInputProps("scopusIndexing")}

                    />
                </div>

                <Text fw={500} style={{ marginTop: "30px" }}>
                    Photo of the acceptance
                </Text>

                <div>
                    <Dropzone
                        onDrop={(files) => setFiles(files)}
                        onReject={(files) => {
                            showNotification({
                                title: "File upload Error",
                                message: "try to reupload another file",
                                autoClose: 1500,
                                icon: <IconX />,
                                color: "red",
                            });
                        }}
                        maxSize={5 * 1024 ** 2}
                        accept={IMAGE_MIME_TYPE}
                        maxFiles={1}
                    // {...props}
                    >
                        <Group
                            justify="center"
                            gap="xl" mih={220}
                            style={{ pointerEvents: 'none' }}>
                            <Dropzone.Accept>
                                <IconUpload
                                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                                    stroke={1.5}
                                />
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <IconX
                                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                                    stroke={1.5}
                                />
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                <IconPhoto
                                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                                    stroke={1.5}
                                />
                            </Dropzone.Idle>

                            <div>
                                <Text size="xl" inline>
                                    Drag images here or click to select files
                                </Text>
                                <Text size="sm" c="dimmed" inline mt={7}>
                                    The file should not exceed 5mb
                                </Text>
                            </div>
                        </Group>
                    </Dropzone>
                    {/* <Button variant="gradient"
                        gradient={{ from: 'lime', to: 'green', deg: 90 }}
                    >
                        Scan photo
                    </Button> */}
                </div>

                <center style={{ paddingTop: '10px' }}>
                    <Button
                        variant="gradient"
                        gradient={{ from: 'red', to: 'violet', deg: 90 }}
                        onClick={handleScan}
                    >
                        Publish Research
                    </Button>
                </center>
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
                            <Table.Th>Registration No</Table.Th>
                            <Table.Th>Title</Table.Th>
                            <Table.Th>Category</Table.Th>
                            <Table.Th>No of Members</Table.Th>
                            <Table.Th>Action</Table.Th>

                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </Container>
    );
}
