
import React, { useState, useEffect } from "react";

function Color() {
  const [favoriteColor, setFavoriteColor] = useState("red");

  useEffect(() => {
    alert("useEffect reached");
  }, [favoriteColor]); // déclenche uniquement quand favoriteColor change

  return (
    <div>
      <h2>{favoriteColor}</h2>
      <button onClick={() => setFavoriteColor("blue")}>Change to blue</button>
    </div>
  );
}

export default Color;
