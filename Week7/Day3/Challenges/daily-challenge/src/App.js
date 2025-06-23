
import React, { useState } from "react";
import FormComponent from "./FormComponent";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    destination: "",
    lactoseFree: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const queryString = new URLSearchParams({
      ...formData,
      lactoseFree: formData.lactoseFree ? "on" : "off",
    }).toString();

    // Simulate navigation with query string
    window.history.pushState({}, "", `?${queryString}`);
    alert("Form submitted! Check the URL.");
  };

  return (
    <div>
      <h1>React Form</h1>
      <FormComponent
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
