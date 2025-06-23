import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./ErrorBoundary";
import Example1 from "./Example1";
import Example2 from "./Example2";
import Example3 from "./Example3";



const HomeScreen = () => <h1>Home</h1>;
const ProfileScreen = () => <h1>Profile</h1>;
const ShopScreen = () => {
  throw new Error("Something went wrong in the shop!");
};

function App() {

  return (
    <div className="container mt-5">
      <h1>React Error Boundaries Example</h1>
      <p>This example demonstrates how to use Error Boundaries in React.</p>
      <Example1 />
      <Example2 />
      <Example3 />
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/profile">Profile</NavLink>
        <NavLink className="nav-link" to="/shop">Shop</NavLink>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <HomeScreen />
            </ErrorBoundary>
          }
        />
        <Route
          path="/profile"
          element={
            <ErrorBoundary>
              <ProfileScreen />
            </ErrorBoundary>
          }
        />
        <Route
          path="/shop"
          element={
            <ErrorBoundary>
              <ShopScreen />
            </ErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

// Exercise4:
const sendData = async () => {
  const response = await fetch("https://webhook.site/a4558522-737e-46a4-b932-ea958b03197b", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key1: "myusername",
      email: "a4558522-737e-46a4-b932-ea958b03197b@emailhook.site",
      name: "Maryam",
      lastname: "Toubali",
      age: 27,
    }),
  });

  const result = await response.json().catch(() => ({}));
  console.log("Server response:", result);
};

<button onClick={sendData}>Send JSON</button>


export default App;
