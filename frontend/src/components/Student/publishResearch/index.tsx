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


const elements = [
    { registrationNo: " JUN_WE_001", title: "VD room", category: 'Fasion', members: 4 },

];

export function PublishResearch() {

    const [opened, { open, close }] = useDisclosure(false);


    const rows = elements.map((element) => (
        <Table.Tr key={element.registrationNo}>
            <Table.Td>{element.registrationNo}</Table.Td>
            <Table.Td>{element.title}</Table.Td>
            <Table.Td>{element.category}</Table.Td>
            <Table.Td>{element.members}</Table.Td>
            <Table.Td>
                <Center>
                    <Button
                        onClick={open}
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
                <Text fw={500}>
                    Y4_RSR_GRP-1
                </Text>

                <Text fw={500} style={{ marginTop: "40px" }}>
                    Group Members
                </Text>

                <div style={{ display: "flex", gap: 30 }}>
                    <TextInput
                        rightSectionPointerEvents="none"
                        label="Name"
                        placeholder="Venura"
                        disabled
                    />
                    <TextInput
                        rightSectionPointerEvents="none"
                        label="Name"
                        placeholder="Vinnath"
                        disabled
                    // {...form.getInputProps("email")}
                    />
                    <TextInput
                        rightSectionPointerEvents="none"
                        label="Name"
                        placeholder="Sahan"
                        disabled
                    />

                    <TextInput
                        rightSectionPointerEvents="none"
                        label="Name"
                        placeholder="Shehan"
                        disabled
                    />
                </div>

                <Text fw={500} style={{ marginTop: "30px" }}>
                    Supervisors
                </Text>
                <div style={{ display: "flex", gap: 30 }}>
                    <NativeSelect name="SupervisorName" w="200px" label="Supervisor Name" data={['XYZ', 'NMO']} required />

                    <NativeSelect name="coSupervisorName" w="200px" label="Co-Supervisor Name" data={['XYZ', 'NMO']} required />

                </div>

                <div style={{ display: "flex", gap: 30, marginTop: "20px" }}>

                    <Text fw={500} style={{ marginTop: "30px" }}>
                        Name of the conference or journal
                    </Text>

                    <TextInput
                        style={{ marginTop: "25px" }}
                        rightSectionPointerEvents="none"
                        placeholder="VD Room"
                        disabled
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