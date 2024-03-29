
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
import StudentAPI from '../../../API/studentAPI/student.api';
import { useForm } from '@mantine/form';

const elements2 = [
    { StudentNumber: "IT21211928", StudentName: "Venura" },
    { StudentNumber: "IT21334244", StudentName: "Vinnath" },
    { StudentNumber: "IT23431112", StudentName: "Sahan" },
    { StudentNumber: "IT23431352", StudentName: "Shehan" },


];
export const ManageMarks = () => {

    const [opened, { open, close }] = useDisclosure(false);
    const icon = <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

    // Declare publish research form
    const addMarkForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            _id:"",
            groupID: "",
            leaderName: "",
            leaderID:"",
            member1Name: "",
            member1ID: "",
            member2Name: "",
            member2ID: "",
            member3Name: "",
            member3ID: "",
            comment: ""
        },
    });

    const formData = {
        _id: addMarkForm.values._id,
        groupID: addMarkForm.values.groupID,
        leader: {
          name: addMarkForm.values.leaderName,
          id: addMarkForm.values.leaderID
        },
        members: [
          {
            name: addMarkForm.values.member1Name,
            id: addMarkForm.values.member1ID
          },
          {
            name: addMarkForm.values.member2Name,
            id: addMarkForm.values.member2ID
          },
          {
            name: addMarkForm.values.member3Name,
            id: addMarkForm.values.member3ID
          }
        ],
        comment: addMarkForm.values.comment
      };
      

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


    console.log(data);

    const rows = data.map((element: any) => (
        <Table.Tr key={element._id}>
            <Table.Td>{element.groupID}</Table.Td>
            <Table.Td>{element.title}</Table.Td>
            <Table.Td>
                <Center>
                    <Button
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                        onClick={() => {
                            addMarkForm.setValues({
                                _id : element._id,
                                groupID: element.groupID,
                                leaderName: element.leader[0].name,
                                leaderID: element.leader[0].registrationNumber,

                                member1Name: element.members[0].name,
                                member1ID: element.members[0].registrationNumber,

                                member2Name: element.members[1].name,
                                member2ID: element.members[1].registrationNumber,

                                member3Name: element.members[2].name,
                                member3ID: element.members[2].registrationNumber,
                            })
                            open();

                        }}
                    >
                        Add Marks
                    </Button>
                </Center>
            </Table.Td>


        </Table.Tr>
    ));
    console.log(addMarkForm.values);

    const modalRows = Object.keys(formData).map((element:any) => (
        <Table.Tr key={element._id}>
            <Table.Td>{element.StudentNumber}</Table.Td>
            <Table.Td>{element.StudentName}</Table.Td>
            <Table.Td>
                <TextInput>

                </TextInput>
            </Table.Td>

            <Table.Td>
                <TextInput
                >

                </TextInput>
            </Table.Td>

            <Table.Td>
                <TextInput
                >

                </TextInput>
            </Table.Td>

            <Table.Td>
                <TextInput
                >

                </TextInput>
            </Table.Td>

            <Table.Td>
                <TextInput>

                </TextInput>
            </Table.Td>

            <Table.Td>
                <Button
                    variant="filled"
                    color="red"
                    radius="xl"
                >
                    Submit Marks
                </Button>

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
                            <Table.Th>Action</Table.Th>
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