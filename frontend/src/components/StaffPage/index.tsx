import React, { useState } from "react";
import { DateInput } from "@mantine/dates";
import { Input, Button, } from "@mantine/core";

import { Select } from "@mantine/core";

const StaffPage = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Select
          label="Select the Specialization"
          placeholder="Pick Specialization"
          data={["IT", "DS", "CSNE", "SE"]}
         
        />
        <p>Select Date</p>
        <input
          type="date"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
            backgroundColor: "#f8f8f8",
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg fill=%22%23616161%22 viewBox=%220 0 24 24%22 width=%2224px%22 height=%2224px%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M20,4H19V3c0-0.55-0.45-1-1-1s-1,0.45-1,1v1H7V3c0-0.55-0.45-1-1-1S5,2.45,5,3v1H4C2.9,4,2.01,4.9,2.01,6L2,20c0,1.1,0.9,2,2,2h16 c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M18,6H6V5h12V6z M19,18H5V9h14V18z M7,11h10v2H7V11z M7,15h10v2H7V15z%22/></svg>')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
            backgroundSize: "20px",
            appearance: "none", // Hide the default arrow icon in some browsers
          }}
        />

          <br></br>
          <br></br>
        <Input.Wrapper
          label="Enter Time Duration"
          error="Input error"
          size="md"
        >
          <Input placeholder="Input inside Input.Wrapper" />
        </Input.Wrapper>
        <br />
        <Button variant="filled" color="green">
          Search
        </Button>
      </div>
    </div>
  );
};

export default StaffPage;
