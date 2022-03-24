import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { BroweserRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Home from "./containers/Home";
function App() {
  return (
    <div className="Container">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
