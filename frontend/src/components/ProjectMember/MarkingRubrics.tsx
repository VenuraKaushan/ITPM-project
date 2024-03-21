import React, { useState } from "react";
import "../../Styles/MarkingRubrics.css";
import { Button } from "@mantine/core";

const MarkingRubrics = () => {
  const [tableData, setTableData] = useState([
    { id: 1, criteria: "", subCriteria: "", description: "", marks: "" },
  ]);
  const [idCounter, setIdCounter] = useState(2);

  const handleInputChange = (index:any, event:any) => {
    const { name, value } = event.target;
    const newData = [...tableData];
    newData[index][name] = value;
    setTableData(newData);
  };

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      {
        id: idCounter,
        criteria: "",
        subCriteria: "",
        description: "",
        marks: "",
      },
    ]);
    setIdCounter(idCounter + 1);
  };

  const handleDeleteRow = (id) => {
    const newData = tableData.filter((row) => row.id !== id);
    setTableData(newData);
  };
  return (
    <div>
      <div className="table-container" style={{marginTop:'40px'}}>
        <table className="custom-table" >
          <thead>
            <tr>
              <th>Criteria</th>
              <th>Sub Criteria</th>
              <th>Description</th>
              <th>Marks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={row.id}>
                <td>
                  <input
                    type="text"
                    name="criteria"
                    value={row.criteria}
                    onChange={(e) => handleInputChange(index, e)}
                    className="input-field"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="subCriteria"
                    value={row.subCriteria}
                    onChange={(e) => handleInputChange(index, e)}
                    className="input-field"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="description"
                    value={row.description}
                    onChange={(e) => handleInputChange(index, e)}
                    className="input-field"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="marks"
                    value={row.marks}
                    onChange={(e) => handleInputChange(index, e)}
                    className="input-field"
                  />
                </td>
                <td>
                  <Button
                    onClick={() => handleDeleteRow(row.id)}
                    variant="filled"
                    color="red"
                    radius="xl"
                  >
                    Delete Row
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          onClick={handleAddRow}
          variant="filled"
          color="teal"
          radius="xl"
        >
          Add Row
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "indigo", deg: 360 }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MarkingRubrics;
