import React, { useState } from "react";
import { DateInput } from "@mantine/dates";
import { Input, Button } from "@mantine/core";

import { Select } from "@mantine/core";

const StaffPage = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <>
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
      <br></br>

      <Button variant="filled" color="green">Search</Button>

    
      
    </>
  );
};

export default StaffPage;
