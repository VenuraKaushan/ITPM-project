import { useState , useEffect  } from "react";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Button,
  Modal,
  Tooltip,
  ActionIcon,
  Container
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconAt,
  IconUser,
  IconEdit,
  IconMessage,
} from "@tabler/icons-react";
import classes from "../../../Styles/TableSort.module.css";
import CoordinatorAPI from "../../../API/coordinatorAPI/coordinator.api";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";

const elements = [
  { presentation1: "76", report1: "91",document: "80" },
];

const AssessmentMark = ({ assessmentMarksData }: { assessmentMarksData: any }) => {

  console.log(assessmentMarksData)

  const [editOpened, setEditOpened] = useState(false);
  const [commentsOpened, setCommentsOpened] = useState(false);
  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const IconUserr = <IconUser style={{ width: rem(16), height: rem(16) }} />;



  const rows = elements.map((row:any) => (
    <Table.Tr key={row._id}>
    <Table.Td>{row._id}</Table.Td>
    <Table.Td>{row.groupNo}</Table.Td>
    <Table.Td>{row.studentName}</Table.Td>
    <Table.Td>{row.regNo}</Table.Td>
    <Table.Td>{row.proposal}</Table.Td>
    <Table.Td>{row.progress1}</Table.Td>
    <Table.Td>{row.progress2}</Table.Td>
    <Table.Td>{row.final}</Table.Td>

    <Table.Td>
      <center>
        <Tooltip label="Edit">
          <ActionIcon
            onClick={() => {
              editForm.setValues({
                _id: row._id,
                groupNo: row.groupNo,
                studentName: row.studentName,
                regNo: row.regNo,
                proposal: row.proposal,
                progress1: row.progress1,
                progress2: row.progress2,
                final: row.final,
              });
              setEditOpened(true);
            }}
            style={{ marginRight: "30px" }}
            color="blue"
          >
            <IconEdit />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="View">
          <ActionIcon
            onClick={() => {
              commentsForm.setValues({});
              setCommentsOpened(true);
            }}
            color="#89ec9c"
          >
            <IconMessage />
          </ActionIcon>
        </Tooltip>
      </center>
    </Table.Td>
  </Table.Tr>
));
//from Structure
const form = useForm({
  validateInputOnChange: true,

  initialValues: {
    _id: "",
    groupNo: "",
    studentName: "",
    regNo: "",
    proposal: "",
    progress1: "",
    progress2: "",
    final: "",
  },
});

const commentsForm = useForm({
  validateInputOnChange: true,

  initialValues: {
    proposal: "",
    progress1: "",
    progress2: "",
    final: "",
  },
});

//declare edit form
const editForm = useForm({
  validateInputOnChange: true,

  initialValues: {
    _id: "",
    groupNo: "",
    studentName: "",
    regNo: "",
    proposal: "",
    progress1: "",
    progress2: "",
    final: "",
  },
});


return (
    <Container>
      <div style={{ position: "absolute", top: "160px", marginLeft:'-200px' }}>
        <ScrollArea>

        <form>
          <Modal
          size= "80%"
            opened={commentsOpened}
            onClose={() => {
              editForm.reset();
              setCommentsOpened(false);
            }}
            title="View Comments"
          >
            <Table withTableBorder withColumnBorders>
              <Table.Tr>
                <Table.Th></Table.Th>
                <Table.Th>Proposal</Table.Th>
                <Table.Th>Progress 1</Table.Th>
                <Table.Th>Progress2</Table.Th>
                <Table.Th>Final</Table.Th>
              </Table.Tr>

              <Table.Tr>
                <Table.Th>Examiner</Table.Th>
               
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Supervisor</Table.Th>
               
              </Table.Tr>
            </Table>
          </Modal>
        </form>

         {/* student edit modal */}
         <form>
          <Modal
            opened={editOpened}
            onClose={() => {
              editForm.reset();
              setEditOpened(false);
            }}
            title="Edit Assessment Marks"
          >
            
            <TextInput
              mt="md"
              rightSectionPointerEvents="none"
              rightSection={icon}
              label="Registration Number"
              placeholder="IT21244766"
              {...form.getInputProps("regNo")}
            />
            <TextInput
              mt="md"
              rightSectionPointerEvents="none"
              label="Proposal"
              placeholder="Proposal"
            />

            <TextInput
              mt="md"
              rightSectionPointerEvents="none"
              label="Progress 1"
              placeholder="Progress 1"
            />

            <TextInput
              mt="md"
              rightSectionPointerEvents="none"
              label="Progress 2"
              placeholder="Progress 2"
            />

            <TextInput
              mt="md"
              rightSectionPointerEvents="none"
              label="Final"
              placeholder="Final"
            />

            <center style={{ paddingTop: "10px" }}>
              <Button
                variant="gradient"
                gradient={{ from: "gray", to: "blue", deg: 0 }}
              >
                Edit Details
              </Button>
            </center>
          </Modal>
        </form>
        <div style={{ marginRight: "50px" }}>
          <ScrollArea>
            <Table
              highlightOnHover
              withTableBorder
              withColumnBorders
              horizontalSpacing="md"
              verticalSpacing="xs"
              miw={700}
              layout="fixed"
            >
              <Table.Tbody>
                <Table.Tr>
                  <Table.Th
                    
                  >
                    ID
                  </Table.Th>
                  <Table.Th
                   
                  >
                    Group No
                    </Table.Th>
                 
                  <Table.Th
                   
                  >
                    Registration number
                    </Table.Th>
                  <Table.Th
                   
                  >
                    Proposal
                    </Table.Th>
                  <Table.Th
                   
                  >
                    Progress 1
                    </Table.Th>
                  <Table.Th
                   
                  >
                    Progress 2
                    </Table.Th>
                  <Table.Th
                   
                  >
                    Final
                    </Table.Th>
                  <Table.Th
                    
                  >
                    Action
                    </Table.Th>
                </Table.Tr>
              </Table.Tbody>
              
            </Table>
          </ScrollArea>
        </div>


        </ScrollArea>
        </div>
    </Container>
)
}


export default AssessmentMark;