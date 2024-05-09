import { useState , useEffect  } from "react";
import {
  Table,
  ScrollArea,
  TextInput,
  rem,
  Button,
  Modal,
  Tooltip,
  ActionIcon,
  Container
} from "@mantine/core";
import {
  IconAt,
  IconUser,
  IconEdit,
  IconMessage,
} from "@tabler/icons-react";


import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import CoordinatorAPI from "../../../API/coordinatorAPI/coordinator.api";

const elements = [
  { presentation1: "76", report1: "91",document: "80" },
];

const AssessmentMark = ({ assessmentMarksData }: { assessmentMarksData: any }) => {


  console.log(assessmentMarksData)

  
  const [editOpened, setEditOpened] = useState(false);
  const [commentsOpened, setCommentsOpened] = useState(false);
  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const IconUserr = <IconUser style={{ width: rem(16), height: rem(16) }} />;


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
    registrationNumber: "",
    proposalMarks: "",
    progress1Marks: "",
    progress2Marks: "",
    finalPresentationMarks: "",
  
  },
});

console.log(editForm.values)

const updateAssestmentMark = async (values:{
        _id : string,
        registrationNumber : string,
        proposalMarks : string,
        progress1Marks : string,
        progress2Marks : string,
        finalPresentationMarks : string

}) =>{
  showNotification({
    id: 'Update Marks',
    loading : true,
    title : "Updating items record",
    message : "Please wait while we update Marks record..",
    autoClose : 2000,
  });
CoordinatorAPI.updateAssestmentMark(values)
  .then((response)=>{
    updateNotification({
      id: "update-marks",
      color: "teal",
      // icon: <IconCheck />,
      title: "Marks updated successfully",
      message: "Marks data updated successfully.",
      //icon: <IconCheck />,
      autoClose: 3000,
    });
    editForm.reset();
    setEditOpened(false);

    
  })
  .catch((error) => {
    updateNotification({
      id: "update-items",
      color: "red",
      title: "Items updatimg failed",
      // icon: <IconX />,
      message: "We were unable to update the Items",
      // icon: <IconAlertTriangle />,
      autoClose: 5000,
    });
  });
};




return (
  <Container>
  <div style={{ position: "absolute", top: "160px", marginLeft:'-250px', marginRight:'30px' }}>

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
              {...editForm.getInputProps("registrationNumber")}
            />
            <TextInput
              mt="md"
              rightSectionPointerEvents="none"
              label="Proposal Marks"
              placeholder="Proposal Marks"
              {...editForm.getInputProps("proposalMarks")}
            />
            <TextInput
              mt="md"
              rightSectionPointerEvents="none"
              label="Progress 1 Marks"
              placeholder="Progress 1 Marks"
              {...editForm.getInputProps("progress1Marks")}
            />

            <TextInput
              mt="md"
              rightSectionPointerEvents="none"
              label="	Progress 2 Marks"
              placeholder="Progress 2 Marks"
              {...editForm.getInputProps("progress2Marks")}
            />

            <TextInput
              mt="md"
              rightSectionPointerEvents="none"
              label="	Final Presentation Marks"
              placeholder="Final Presentation Marks"
              {...editForm.getInputProps("finalPresentationMarks")}
            />

           

            <center style={{ paddingTop: "10px" }}>
              <Button
                variant="gradient"
                type="submit"
                gradient={{ from: "gray", to: "blue", deg: 0 }}
                onClick={() => {
                  // Handle edit action
                  updateAssestmentMark( editForm.values);
                }}
              >
                Edit Details
              </Button>
            </center>
          </Modal>
        </form>
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
          <Table.Thead>
              <Table.Tr>
                <Table.Th>Registration Number</Table.Th>
                <Table.Th>Proposal Marks</Table.Th>
                <Table.Th>Progress 1 Marks</Table.Th>
                <Table.Th>Progress 2 Marks</Table.Th>
                <Table.Th>Final Presentation Marks</Table.Th>
                <Table.Th>Comments</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
        <Table.Tbody>
        {assessmentMarksData?.student?.map((student: any) => (
            <Table.Tr key={student._id}>
              <Table.Td>{student.registrationNumber}</Table.Td>
              <Table.Td>{student.proposalMarks}</Table.Td>
              <Table.Td>{student.progress1Marks}</Table.Td>
              <Table.Td>{student.progress2Marks}</Table.Td>
              <Table.Td>{student.finalPresentationMarks}</Table.Td>
              <Table.Td>{student.comments}</Table.Td>
              <Table.Td>
                <center>
                  <Tooltip label="Edit">
                    <ActionIcon
                      onClick={() => {
                        editForm.setValues({
                          _id: student._id,
                          registrationNumber: student.registrationNumber,
                          proposalMarks: student.proposalMarks,
                          progress1Marks: student.progress1Marks,
                          progress2Marks: student.progress2Marks,
                          finalPresentationMarks: student.finalPresentationMarks,
                          
                        });
                        setEditOpened(true);
          
                      }}
                      style={{ marginRight: "30px" }}
                      color="blue"
                    >
                      <IconEdit />
                    </ActionIcon>
                  </Tooltip>

                  
                </center>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  </div>
</Container>
)
}


export default AssessmentMark;