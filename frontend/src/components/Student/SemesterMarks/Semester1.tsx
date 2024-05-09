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
    { presentation1: "76", report1: "91", document: "80" },
];

export const Semester1Marks = () => {
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

    console.log(data)

    const userMarks = data?.student?.find((student: any) => student.registrationNumber === regNo);

    console.log(userMarks)

    const rows = userMarks ? (
        <Table.Tr key={userMarks._id}>
          <Table.Td>{userMarks.proposalMarks}</Table.Td>
          <Table.Td>{userMarks.progress1Marks}</Table.Td>
          <Table.Td>60</Table.Td>
          <Table.Td>78</Table.Td>
        </Table.Tr>
      ) : null;

    return (
        <Container>
            <Center style={{ marginTop: "20px" }}>
                <Text
                    size="lg"
                    fw={700}
                >
                    1st Semester Marks
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
                            <Table.Th>Proposal viva</Table.Th>
                            <Table.Th>Progress 1 viva</Table.Th>
                            <Table.Th>Status report 1</Table.Th>
                            <Table.Th>Proposal document</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </Container>
    )

}