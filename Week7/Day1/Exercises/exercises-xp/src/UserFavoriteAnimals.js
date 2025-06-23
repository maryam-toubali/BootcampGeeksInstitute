// Exercise2:
import React, { Component } from "react";

class UserFavoriteAnimals extends Component {
  render() {
    const { favAnimals } = this.props;
    return (
      <div>
        <h4>Favorite Animals:</h4>
        <ul>
          {favAnimals.map((animal, index) => (
            <li key={index}>{animal}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserFavoriteAnimals;
