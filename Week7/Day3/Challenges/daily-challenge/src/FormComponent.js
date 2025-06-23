
import React from "react";

function FormComponent({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <br />

      <input
        type="text"
        placeholder="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <br />

      <input
        type="number"
        placeholder="Age"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />
      <br />

      <label>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={formData.gender === "male"}
          onChange={handleChange}
        />
        Male
      </label>

      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={formData.gender === "female"}
          onChange={handleChange}
        />
        Female
      </label>
      <br />

      <label>
        Destination:
        <select
          name="destination"
          value={formData.destination}
          onChange={handleChange}
        >
          <option value="">-- Please choose a destination --</option>
          <option value="Japan">Japan</option>
          <option value="Macao">Macao</option>
          <option value="Hong Kong">Hong Kong</option>
          <option value="Las Vegas">Las Vegas</option>
        </select>
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          name="lactoseFree"
          checked={formData.lactoseFree}
          onChange={handleChange}
        />
        Lactose Free
      </label>
      <br />

      <button type="submit">Submit</button>

      <h2>Entered Information:</h2>
      <p>
        {formData.firstName} {formData.lastName}, {formData.age} years old
      </p>
      <p>Gender: {formData.gender}</p>
      <p>Destination: {formData.destination}</p>
      <p>Lactose Free: {formData.lactoseFree ? "Yes" : "No"}</p>
    </form>
  );
}

export default FormComponent;
