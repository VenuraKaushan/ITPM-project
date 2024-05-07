import React from "react";
import "../../Styles/ResearchTable.css";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "@mantine/core";

const ResearchManagement = () => {
  const data = [
    {
      projectTitle: "Virtual Dressing Shop",
      groupNumber: "WE-IT056",
      date: "2023-12-01",
      time: "10:00 AM",
      examiner: "Prof. Johnson",
    },
    {
      projectTitle: "Project 2",
      groupNumber: "WE-IT057",
      date: "2023-12-02",
      time: "11:00 AM",
      examiner: "Prof. Davis",
    },

    {
      projectTitle: "Virtual Dressing Shop",
      groupNumber: "WE-IT056",
      date: "2023-12-01",
      time: "10:00 AM",
      examiner: "Prof. Johnson",
    },
    {
      projectTitle: "Project 2",
      groupNumber: "WE-IT056",
      date: "2023-12-02",
      time: "11:00 AM",
      examiner: "Prof. Davis",
    },
    // Add more data as needed
  ];



  return (
    <div className="table-container" style={{ marginTop: "25px" }}>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Group Number</th>
            <th>Date</th>
            <th>Time</th>

            <th>Examiner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.projectTitle}</td>
              <td>{item.groupNumber}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>

              <td>
                <MultiSelect
                  label="Select 3 Examiners"
                  placeholder="Pick Examiners"
                  data={["Dr.Dilshan", "Dr.Dinuka", "Dr.Harendra", "Dr.Kavinga"]}
                />
              </td>
              <td>
                {/* Add actions buttons here */}
                <Button variant="filled" color="green" radius="xl">
                  Presentation Marking Rubrics
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResearchManagement;
