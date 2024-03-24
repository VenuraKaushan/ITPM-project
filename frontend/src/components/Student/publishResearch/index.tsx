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
    NativeSelect,
    Group,
    rem
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useQuery } from "@tanstack/react-query";
import StudentAPI from '../../../API/studentAPI/student.api';
import { useForm } from '@mantine/form';

export function PublishResearch() {
    const [opened, { open, close }] = useDisclosure(false);

    // Declare publish research form
    const publishReseach = useForm({
        validateInputOnChange: true,
        initialValues: {
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

    // Use react query and fetch research data
    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["researchData"],
        queryFn: () => StudentAPI.getResearch().then((res) => res.data),
    });


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
                <TextInput fw={500}
                    {...publishReseach.getInputProps("groupID")}
                    disabled

                >
                </TextInput>

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

                    <Text fw={500} style={{ marginTop: "30px" }}>
                        Link for view H-index
                    </Text>

                    <TextInput
                        style={{ marginTop: "25px" }}
                        rightSectionPointerEvents="none"
                    />

                    <Text fw={500} style={{ marginTop: "30px" }}>
                        Link for  verify the Scopus indexing                    </Text>

                    <TextInput
                        style={{ marginTop: "25px" }}
                        rightSectionPointerEvents="none"
                    />
                </div>

                <Text fw={500} style={{ marginTop: "30px" }}>
                    Photo of the acceptance
                </Text>

                <div>
                    <Dropzone
                        onDrop={(files) => console.log('accepted files', files)}
                        onReject={(files) => console.log('rejected files', files)}
                        maxSize={5 * 1024 ** 2}
                        accept={IMAGE_MIME_TYPE}
                    // {...props}
                    >
                        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
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
                </div>

                <center style={{ paddingTop: '10px' }}>
                    <Button
                        variant="gradient"
                        gradient={{ from: 'red', to: 'violet', deg: 90 }}

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
