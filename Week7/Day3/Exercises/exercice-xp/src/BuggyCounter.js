
import React, { Component } from "react";

class BuggyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick = () => {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }));
  };

  render() {
    if (this.state.counter === 5) {
      throw new Error("I crashed!");
    }
    return (
      <h2 onClick={this.handleClick}>
        Click to increase: {this.state.counter}
      </h2>
    );
  }
}

export default BuggyCounter;
