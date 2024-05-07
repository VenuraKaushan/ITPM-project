import React, { useState }  from "react";
import { Select, Button } from "@mantine/core";

export const StaffPage = () => {

  const [duration, setDuration] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const inputDuration = parseInt(event.target.value, 10); // Parse input as integer
    setDuration(inputDuration);

    // Validate duration
    if (inputDuration < 10 || inputDuration > 20) {
      setErrorMessage("Time duration should be between 10 to 20 minutes.");
    } else {
      setErrorMessage("");
    }
  };

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
        type="number" // Use type="number" for numeric input
        id="duration"
        value={duration}
        onChange={handleChange}
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
        // hoverStyle={{ backgroundColor: '#6c63ff' }}
      >
        Search
      </Button>
    </div>
  );
};
