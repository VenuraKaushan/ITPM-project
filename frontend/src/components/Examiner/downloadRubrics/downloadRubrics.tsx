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
import ExaminerAPI from '../../../API/examinerAPI';
import { useQuery } from "@tanstack/react-query";
import {
    IconSearch,
    IconFileBarcode
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

export const DownloadRubrics = () => {
    const [sessionData, setSessionData] = useState("");

    // Use react query and fetch rubrics data
    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["rubricsData"],
        queryFn: () => ExaminerAPI.getRubrics().then((res) => res.data),
    });


    const handlePDFDownload = (data:any, user:any) => {
        // Create a new jsPDF instance
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        // Add content to the PDF
        doc.text(`Presentation Name: ${data.progress}`, 10, 10);
        doc.text(`User: ${user}`, 10, 20);

        // Set up table headers
        doc.setDrawColor(0);
        doc.setFillColor(240, 240, 240);

        // Calculate the starting X coordinate to center the table
        const tableWidth = 190; // Total width of the table (50 + 70 + 30 + 10 * 3 for borders)
        const startX = (doc.internal.pageSize.width - tableWidth) / 2;

        doc.rect(startX, 30, 50, 10, "FD"); // Criteria
        doc.rect(startX + 50, 30, 70, 10, "FD"); // Description
        doc.rect(startX + 120, 30, 30, 10, "FD"); // Marks
        doc.text("Criteria", startX + 5, 35);
        doc.text("Description", startX + 55, 35);
        doc.text("Marks", startX + 125, 35);

        // Add table rows
        let y = 40;
        data.tableContent.forEach((item:any, index:any) => {
            const criteriaLines = doc.splitTextToSize(item.criteria, 50);
            const descriptionLines = doc.splitTextToSize(item.description, 70);
            const maxLines = Math.max(criteriaLines.length, descriptionLines.length);

            let currentY = y;
            for (let i = 0; i < maxLines; i++) {
                const criteriaLine = criteriaLines[i] || "";
                const descriptionLine = descriptionLines[i] || "";
                const marks = i === 0 ? item.marks : "";

                doc.rect(startX, currentY, 50, 10, "S"); // Criteria border
                doc.rect(startX + 50, currentY, 70, 10, "S"); // Description border
                doc.rect(startX + 120, currentY, 30, 10, "S"); // Marks border

                doc.text(criteriaLine, startX + 5, currentY + 5);
                doc.text(descriptionLine, startX + 55, currentY + 5);
                doc.text(marks, startX + 125, currentY + 5);

                currentY += 10;
            }

            y = currentY;
        });

        // Save the PDF
        doc.save(`RUBRICS_${year}_${month}_${date}.pdf`);
    }






    useEffect(() => {
        // Retrieve user details from local storage
        const userExaminerSessionString = localStorage.getItem("user-staff-session");
        if (userExaminerSessionString) {
            const userExaminertSession = JSON.parse(userExaminerSessionString);

            setSessionData(userExaminertSession.name);
        } else {
            console.log("User session data not found in local storage");
        }
    }, []);

    //get current Full Date
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    const rows = data.map((element: any) => (
        <Table.Tr key={element._id}>
            <Table.Td>{element.progress}</Table.Td>
            <Table.Td>
                <Center>

                    <Button
                        variant="gradient"
                        gradient={{ from: "orange", to: "red" }}
                        leftSection={<IconFileBarcode size={20} />}
                        onClick={() => handlePDFDownload(element, sessionData)}
                    >
                        Download
                    </Button>


                </Center>
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

            </Center>
            <ScrollArea>

                <Table
                    striped withColumnBorders
                    horizontalSpacing="ls"
                    verticalSpacing="xs"
                    style={{ tableLayout: "auto", width: "100%", marginTop: "20px" }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Title</Table.Th>
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </Container>
    )
};

