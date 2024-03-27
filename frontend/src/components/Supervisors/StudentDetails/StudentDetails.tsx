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



const elements = [
  { studentnumber: "It21233876", studentname: "shehan", Proposal:" 50", Progress1:"60", Progress2:"55", FinalPresentation:"60", },
  { studentnumber: "It21233576", studentname: "vinnath", Proposal:" 50", Progress1:"60", Progress2:"55", FinalPresentation:"60", },
  { studentnumber: "It21238876", studentname: "sahan", Proposal:" 50", Progress1:"60", Progress2:"55", FinalPresentation:"60", },



];

export const StudentDetails = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const icon = <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

  const rows = elements.map((element) => (
      <Table.Tr key={element.studentnumber}>
          <Table.Td>{element.studentnumber}</Table.Td>
          <Table.Td>{element.studentname}</Table.Td>
          <Table.Td>{element.Proposal}</Table.Td>
          <Table.Td>{element.Progress1}</Table.Td>
          <Table.Td>{element.Progress2}</Table.Td>
          <Table.Td>{element.FinalPresentation}</Table.Td>
          <Table.Td>
              <Center>
                  <Button
                      variant="gradient"
                      gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                      onClick={open}
                  >
                      Edit
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
                  View Marks
              </Text>
          </Center>
          <ScrollArea>

              <Table
                  striped withColumnBorders
                  horizontalSpacing="ls"
                  verticalSpacing="xs"
                  style={{ tableLayout: "auto", width: "100%", marginTop: "60px" }}
              >
                  <Table.Thead>
                      <Table.Tr>
                      <Table.Th>Student Number</Table.Th>
                      <Table.Th>Student Name</Table.Th>
                      <Table.Th>Proposal</Table.Th>
                      <Table.Th>Progress 1</Table.Th>
                      <Table.Th>Progress 2</Table.Th>
                      <Table.Th>Final Presentation</Table.Th>
                      <Table.Th>Action</Table.Th>
                      </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
              </Table>
          </ScrollArea>


      </Container>
  )
}