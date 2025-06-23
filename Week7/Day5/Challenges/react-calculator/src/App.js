import React, { useState } from "react";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setResult("Please enter valid numbers");
      return;
    }

    let res;
    switch (operation) {
      case "add":
        res = a + b;
        break;
      case "subtract":
        res = a - b;
        break;
      case "multiply":
        res = a * b;
        break;
      case "divide":
        if (b === 0) {
          res = "Cannot divide by zero";
        } else {
          res = a / b;
        }
        break;
      default:
        res = "Invalid operation";
    }
    setResult(res);
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
      <h2>React Calculator</h2>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="Enter first number"
        style={{ marginRight: 10 }}
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Enter second number"
      />
      <br />
      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        style={{ marginTop: 10, marginBottom: 10, padding: 5, width: "100%" }}
      >
        <option value="add">Addition (+)</option>
        <option value="subtract">Subtraction (-)</option>
        <option value="multiply">Multiplication (×)</option>
        <option value="divide">Division (÷)</option>
      </select>
      <button onClick={calculate} style={{ padding: "10px 20px" }}>
        Calculate
      </button>
      {result !== null && (
        <h3 style={{ marginTop: 20 }}>
          Result: {typeof result === "number" ? result.toFixed(4) : result}
        </h3>
      )}
    </div>
  );
}

export default App;
