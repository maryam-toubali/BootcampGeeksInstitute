
// import React from "react";
// import BuggyCounter from "./BuggyCounter";
// import ErrorBoundary from "./ErrorBoundary";

// function App() {
//   return (
//     <div>
//       <h1>Simulation 1 : Un seul ErrorBoundary pour 2 composants</h1>
//       <ErrorBoundary>
//         <BuggyCounter />
//         <BuggyCounter />
//       </ErrorBoundary>

//       <h1>Simulation 2 : Un ErrorBoundary pour chaque composant</h1>
//       <ErrorBoundary>
//         <BuggyCounter />
//       </ErrorBoundary>
//       <ErrorBoundary>
//         <BuggyCounter />
//       </ErrorBoundary>

//       <h1>Simulation 3 : Sans ErrorBoundary</h1>
//       <BuggyCounter />
//     </div>
//   );
// }

import React, { Component } from "react";
import Child from "./Child";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  deleteChild = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        {this.state.show && <Child />}
        <button onClick={this.deleteChild}>Delete Child</button>
      </div>
    );
  }
}

export default App;
