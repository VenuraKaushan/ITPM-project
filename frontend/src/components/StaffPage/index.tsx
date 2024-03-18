import React, { useState } from "react";
import { DateInput } from "@mantine/dates";
import { Input, Button } from "@mantine/core";

import { Select } from "@mantine/core";

const StaffPage = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <div style={{ maxWidth: "400px", width: "100%", padding: "20px", textAlign: "center" }}>
      <Select
        label="Select the Specialization"
        placeholder="Pick Specialization"
        data={["IT", "DS", "CSNE", "SE"]}
      />
      <DateInput
        value={value}
        onChange={setValue}
        label="Date input"
        placeholder="Date input"
      />
      <Input.Wrapper label="Enter Time Duration" error="Input error" size="md">
        <Input placeholder="Input inside Input.Wrapper" />
      </Input.Wrapper>
      <br />
      <Button variant="filled" color="green">Search</Button>
    </div>
  </div>
  );
};

export default StaffPage;
