
import React, { useState } from "react";
import "./App.css"; // facultatif si tu veux styliser un peu

function App() {
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 },
    { name: "Java", votes: 0 },
  ]);

  const handleVote = (index) => {
    const newLanguages = [...languages];
    newLanguages[index].votes += 1;
    setLanguages(newLanguages);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>🗳️ Vote For Your Favorite Language</h1>
      {languages.map((lang, index) => (
        <div key={index} style={{ margin: "15px" }}>
          <button onClick={() => handleVote(index)}>
            Vote for {lang.name}
          </button>
          <p>{lang.name} has {lang.votes} votes</p>
        </div>
      ))}
    </div>
  );
}

export default App;
