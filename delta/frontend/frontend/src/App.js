import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Home from "./containers/Home";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ element: Element, ...rest }) => {
  const { loggedIn } = useSelector((state) => state.authentication);

  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("user") ? (
          <Element {...props} />
        ) : (
          <Navigate
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

function App() {
  const { loggedIn } = useSelector((state) => state.authentication);

  return (
    <div className="Container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={loggedIn ? <Home /> : <Navigate to="/login"></Navigate>}
          />
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
