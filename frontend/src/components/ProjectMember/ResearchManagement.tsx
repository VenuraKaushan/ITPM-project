import React from "react";
import "../../Styles/ResearchTable.css";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import PMemberAPI from "../../API/PMemberAPI/pmember.api";

const ResearchManagement = () => {

  const {
    data = [],
    isLoading,
    isError,
    refetch,
} = useQuery({
    queryKey: ["researchData"],
    queryFn: () => PMemberAPI.getResearch().then((res) => res.data),
});
console.log(data)



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
          {data.map((item:any, index:any) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.groupID}</td>
              <td>{item.vivaDate}</td>
              <td>{item.vivaTime}</td>

              <td>
                <MultiSelect
                  label="Select 3 Examiners"
                  placeholder="Pick Examiners"
                  data={[
                    "Dr.Dilshan",
                    "Dr.Dinuka",
                    "Dr.Harendra",
                    "Dr.Kavinga",
                  ]}
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
