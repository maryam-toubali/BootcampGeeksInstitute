// Exercise3:
import React, { Component } from "react";
import "./Exercise.css";

const style_header = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial",
};

class Exercise extends Component {
  render() {
    return (
      <div>
        <h1 style={style_header}>This is an h1 styled with a JS object</h1>
        <p className="para">This is a paragraph</p>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          React Official Site
        </a>
        <form>
          <input type="text" placeholder="Enter something" />
          <button type="submit">Submit</button>
        </form>
        <img
          src="https://via.placeholder.com/150"
          alt="Example"
          style={{ marginTop: "10px" }}
        />
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    );
  }
}

export default Exercise;
