import React from "react";
import "../../Styles/ResearchTable.css";
import { Button } from "@mantine/core";
const ResearchManagement = () => {
  const data = [
    {
      projectTitle: "Virtual Dressing Shop",
      groupNumber: "WE-IT056",
      date: "2023-12-01",
      time: "10:00 AM",
      faculty: "Computing",
      examiner: "Prof. Johnson",
    },
    {
      projectTitle: "Project 2",
      groupNumber: "WE-IT057",
      date: "2023-12-02",
      time: "11:00 AM",
      faculty: "Engineering",
      examiner: "Prof. Davis",
    },

    {
      projectTitle: "Virtual Dressing Shop",
      groupNumber: "WE-IT056",
      date: "2023-12-01",
      time: "10:00 AM",
      faculty: "Computing",
      examiner: "Prof. Johnson",
    },
    {
      projectTitle: "Project 2",
      groupNumber: "WE-IT056",
      date: "2023-12-02",
      time: "11:00 AM",
      faculty: "Engineering",
      examiner: "Prof. Davis",
    },
    // Add more data as needed
  ];

  // Array of examiners for dropdown menu
  const examiners = ["Prof. Dilshan", "Dr. Prasanna", "Prof. Samantha"];

  // Function to handle dropdown change
  const handleDropdownChange = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newData = [...data];
    newData[index].examiner = event.target.value;
    // You can perform additional actions here if needed
    console.log("Selected examiner:", event.target.value);
  };

  return (
    <div className="table-container" style={{marginTop:'25px'}}>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Group Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>Faculty</th>
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
              <td>{item.faculty}</td>
              <td>
                <select
                  value={item.examiner}
                  onChange={(e) => handleDropdownChange(index, e)}
                >
                  <option value="">Select Examiner</option>
                  {examiners.map((examiner, idx) => (
                    <option key={idx} value={examiner}>
                      {examiner}
                    </option>
                  ))}
                </select>
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
