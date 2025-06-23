import React, { Component } from "react";
import data from "./complexData.json";

class Example3 extends Component {
  render() {
    return (
      <div>
        <h2>Experiences</h2>
        {data.Experiences.map((exp, i) => (
          <div key={i}>
            {exp.company} - {exp.years}
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;
