import React, { useState } from "react";
import "../../Styles/MarkingRubrics.css";
import { Button } from "@mantine/core";
import { Select } from "@mantine/core";
import PMemberAPI from "../../API/PMemberAPI/pmember.api";


const MarkingRubrics = () => {
  const [tableData, setTableData] = useState([
    { id: 1, criteria: "", subCriteria: "", description: "", marks: "" },
  ]);
  const [idCounter, setIdCounter] = useState(2);
  const [selectedValue, setSelectedValue] = useState([{}]);

  const handleChange = (value: any) => {
    setSelectedValue(value);
  };

  const handleInputChange = (index: any, event: any) => {
    const { name, value } = event.target;
    const newData = [...tableData];
    newData[index][name] = value;
    setTableData(newData);
  };

  const handleInputCMarks = (index:any, event:any) => {
    const { name, value } = event.target;
    
    // Check if the entered value is a valid number
    const newValue = Number(value);
    
    // Check if the entered value is less than or equal to 100
    if (!isNaN(newValue) && newValue <= 100) {
      const newData = [...tableData];
      newData[index][name] = newValue;
      setTableData(newData);
    }
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

  const handleDeleteRow = (id: any) => {
    const newData = tableData.filter((row) => row.id !== id);
    setTableData(newData);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      // Call the API method with the form data
      await PMemberAPI.addRubrics({ selectedValue, tableData });
      console.log("Rubrics added successfully!");
    } catch (error) {
      console.error("Error adding rubrics:", error);
    }
    console.log("Form submitted:", selectedValue, tableData);
  };
  return (
    <div className="marking-rubrics-container" style={{ marginTop: "40px" }}>
      <form onSubmit={handleSubmit}>
        <center>
          <Select
            required
            label="Progress Evaluation"
            placeholder="Choose..."
            onChange={handleChange}
            data={[
              "Proposal",
              "Progress 1",
              "Progress 2",
              "Final Presentation",
            ]}
            style={{ maxWidth: "200px" }}
          />
        </center>
        <div className="table-container">
          <table className="custom-table">
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
                      placeholder="Criteria"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="subCriteria"
                      value={row.subCriteria}
                      onChange={(e) => handleInputChange(index, e)}
                      className="input-field"
                      placeholder="Sub Criteria"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={row.description}
                      onChange={(e) => handleInputChange(index, e)}
                      className="input-field"
                      placeholder="Description"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="marks"
                      value={row.marks}
                      onChange={(e) => handleInputCMarks(index, e)}
                      className="input-field"
                      placeholder="Marks"
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDeleteRow(row.id)}
                      variant="filled"
                      color="red"
                      radius="xl"
                    >
                      Delete
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
        <div
          className="submit-button-container"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="gradient"
            gradient={{ from: "indigo", to: "indigo", deg: 360 }}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MarkingRubrics;
