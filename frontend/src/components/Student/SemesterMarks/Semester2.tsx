import {
    Table,
    ScrollArea,
    Text,
    Container,
    Center,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useForm } from "@mantine/form";
import StudentAPI from '../../../API/studentAPI/student.api';
import { useQuery } from "@tanstack/react-query";


const elements = [
    { presentation2: "76", finalPresentation: "91", report2: "80", logbook: "78", website: "66", finalThesis: "81" },
];

export const Semester2Marks = () => {
    const [regNo, setRegNo] = useState("")

    useEffect(() => {
        // Retrieve user details from local storage
        const userStudentSessionString = localStorage.getItem("user-student-session");
        if (userStudentSessionString) {
            const userStudentSession = JSON.parse(userStudentSessionString);
            setRegNo(userStudentSession.regNo)
        }
    }, []);
    console.log(regNo)

    // Use react query and fetch marks data
    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["marksData"],
        queryFn: () => StudentAPI.getMarks(regNo).then((res) => res.data),
    });

    const userMarks = data.student && data.student.find((student: any) => student.registrationNumber === regNo);


    const rows = userMarks && (
        <Table.Tr key={userMarks._id}>
          <Table.Td>{userMarks.progress2Marks}</Table.Td>
          <Table.Td>{userMarks.finalPresentationMarks}</Table.Td>
          <Table.Td>60</Table.Td>
          <Table.Td>78</Table.Td>
          <Table.Td>80</Table.Td>
          <Table.Td>78</Table.Td>

        </Table.Tr>
      );

    return (
        <Container>
            <Center style={{ marginTop: "20px" }}>
                <Text
                    size="lg"
                    fw={700}
                >
                    2nd Semester Marks
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
                            <Table.Th>Progress 2 presentation</Table.Th>
                            <Table.Th>Final Presentation</Table.Th>
                            <Table.Th>Status report 2</Table.Th>
                            <Table.Th> log book</Table.Th>
                            <Table.Th>Website</Table.Th>
                            <Table.Th>Final thesis</Table.Th>

                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </Container>
    )
}