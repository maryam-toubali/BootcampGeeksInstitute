
import React, { useState } from "react";

function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true);

  const clickMe = () => alert("I was clicked");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      alert(`You typed: ${e.target.value}`);
    }
  };

  const toggle = () => {
    setIsToggleOn((prev) => !prev);
  };

  return (
    <div>
      <button onClick={clickMe}>Click Me</button>
      <br /><br />
      <input type="text" placeholder="Type and press Enter" onKeyDown={handleKeyDown} />
      <br /><br />
      <button onClick={toggle}>{isToggleOn ? "ON" : "OFF"}</button>
    </div>
  );
}

export default Events;
