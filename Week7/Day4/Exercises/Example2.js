import React, { Component } from "react";
import data from "./complexData.json";

class Example2 extends Component {
  render() {
    return (
      <div>
        <h2>Skills</h2>
        <ul>
          {Object.entries(data.Skills).map(([key, val]) => (
            <li key={key}>
              {key}: {val}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Example2;
