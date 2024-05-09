import React, { useState } from "react";
import { Select, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import PMemberAPI from "../../API/PMemberAPI/pmember.api";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconUpload, IconPhoto, IconX, IconCheck } from "@tabler/icons-react";

export const StaffPage = () => {
  const [duration, setDuration] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Declare publish research form
  const sheduleForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      special: "",
      date: "",
      timeDuration: "",
    },
  });

  const sheduleViva = (values: {
    special: string;
    date: string;
    timeDuration: string;
  }) => {
    showNotification({
      id: "Schedule-Viva",
      color: "teal",
      title: "Publish Research",
      message: "Please wait while we publish your Research..",
      icon: <IconCheck size={16} />,
      autoClose: 5000,
    });
    PMemberAPI.sheduleViva(values)
      .then((res) => {
        updateNotification({
          id: "Schedule-Viva",
          color: "teal",
          icon: <IconCheck />,
          title: "Viva successfully Scheduled",
          message: "Viva successfully Scheduled",
          autoClose: 5000,
        });

        window.location.reload();
      })
      .catch((error) => {
        updateNotification({
          id: "Schedule-Viva",
          color: "red",
          title: "Something went wrong!!",
          icon: <IconX />,
          message: `An error occurred: ${error.response.data.message}`,
          autoClose: 5000,
        });
      });
  };

  const handleChange = (event: any) => {
    const inputDuration = parseInt(event.target.value, 10); // Parse input as integer
    setDuration(inputDuration);

    // Validate duration
    if (inputDuration < 10 || inputDuration > 20) {
      setErrorMessage("Time duration should be between 10 to 20 minutes.");
    } else {
      setErrorMessage("");
    }
  };

  console.log(sheduleForm.values);

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "40px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        marginTop: "25px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>STAFF PAGE</h2>
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="specialization"
          style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}
        ></label>
        <Select
          id="specialization"
          label="Select the Specialization"
          placeholder="Pick value"
          data={["IT", "SE", "DS", "CSNE"]}
          searchable
          {...sheduleForm.getInputProps("special")}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="date"
          style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}
        >
          Select the Date
        </label>
        <input
          type="date"
          id="date"
          {...sheduleForm.getInputProps("date")}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="duration"
          style={{
            display: "block",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Enter Time Duration
        </label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(event) => {
            handleChange(event);
            sheduleForm.getInputProps("timeDuration").onChange(event); // Call the onChange handler from getInputProps
          }}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxSizing: "border-box",
          }}
        />

        {errorMessage && (
          <div style={{ color: "red", marginTop: "5px" }}>{errorMessage}</div>
        )}
      </div>

      <Button
        type="submit"
        variant="gradient"
        gradient={{ from: "lime", to: "blue", deg: 90 }}
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onClick={() => {
          sheduleViva(sheduleForm.values);
        }}

        // hoverStyle={{ backgroundColor: '#6c63ff' }}
      >
        Search
      </Button>
    </div>
  );
};
