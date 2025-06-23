import React, { useState, useEffect } from "react";
import quotes from "./quotes";

const getRandomIndex = (max, exclude) => {
  let index;
  do {
    index = Math.floor(Math.random() * max);
  } while (index === exclude);
  return index;
};

const getRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgColor, setBgColor] = useState(getRandomColor());

  const generateQuote = () => {
    const newIndex = getRandomIndex(quotes.length, currentIndex);
    setCurrentIndex(newIndex);
    setBgColor(getRandomColor());
  };

  useEffect(() => {
    setCurrentIndex(getRandomIndex(quotes.length, -1)); // initial random
  }, []);

  const { text, author } = quotes[currentIndex];

  const appStyle = {
    backgroundColor: bgColor,
    color: bgColor,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background 0.6s ease",
  };

  const quoteBoxStyle = {
    background: "white",
    color: bgColor,
    padding: "2rem",
    borderRadius: "1rem",
    maxWidth: "600px",
    textAlign: "center",
    boxShadow: `0 0 10px ${bgColor}`,
  };

  const buttonStyle = {
    backgroundColor: bgColor,
    color: "white",
    border: "none",
    padding: "0.7rem 1.2rem",
    fontSize: "1rem",
    borderRadius: "0.5rem",
    marginTop: "1.5rem",
    cursor: "pointer",
  };

  return (
    <div style={appStyle}>
      <div style={quoteBoxStyle}>
        <h2>"{text}"</h2>
        <p>- {author}</p>
        <button style={buttonStyle} onClick={generateQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;
