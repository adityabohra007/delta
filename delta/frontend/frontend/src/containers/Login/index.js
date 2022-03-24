import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Notify,
  StyledButton,
  StyledInput,
  StyledInputGroup,
  // StyledLabel,
} from "../../components/StyledInput";
import { StyledLabel } from "../../components/StyledInput";
import {
  loginAsync,
  logout,
} from "../../features/authentication/authenticationSlice";
import { StyledLoginWrapper } from "./Styled";

const Login = () => {
  const [userAuth, setUserAuth] = useState({
    username: "",
    password: "",
    submitted: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.authentication);
  useEffect(() => {
    dispatch(logout());
    console.log(selector);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserAuth({ ...userAuth, [name]: value });
  };
  if (selector.loggedIn) {
    navigate("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserAuth({ ...userAuth, submitted: true });
    const { username, password } = userAuth;
    console.log(username, password);
    if (username && password) {
      dispatch(loginAsync(userAuth));
    }
  };
  return (
    <StyledLoginWrapper>
      <div className="LeftSectionWrapper">
        <div className="heading">Team Manager</div>
        {/* <div></div> */}
        {/* <div> Username - testuser</div>
        <div> Password - testpassword</div> */}
      </div>
      <div className="RightSectionWrapper">
        <div style={{ marginLeft: 70, marginTop: 40, marginRight: 70 }}>
          <div className="heading">Login </div>
          <div>Welcome! Login to manage your team. </div>
          <form onSubmit={handleSubmit} style={{ marginTop: 165 }}>
            {userAuth.submitted && !userAuth.password && (
              <Notify error> Password is required </Notify>
            )}

            {selector.errors && selector.errors.non_field_errors && (
              <Notify error>{selector.errors.non_field_errors[0]}</Notify>
            )}

            {userAuth.submitted && !userAuth.username && (
              <Notify error> Username is required </Notify>
            )}
            <StyledInputGroup>
              <StyledLabel>Username</StyledLabel>
              <StyledInput
                style={
                  userAuth.submitted && !userAuth.username
                    ? { borderColor: "red" }
                    : {}
                }
                value={userAuth.username}
                onChange={handleChange}
                name="username"
                placeholder="Enter your username"
                type={"text"}
              ></StyledInput>
            </StyledInputGroup>
            <StyledInputGroup>
              <StyledLabel>Password</StyledLabel>
              <StyledInput
                style={
                  userAuth.submitted && !userAuth.password
                    ? { borderColor: "red" }
                    : {}
                }
                value={userAuth.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter your password"
                type={"password"}
              ></StyledInput>
            </StyledInputGroup>
            <StyledInputGroup>
              <StyledLabel>
                <input type={"checkbox"} style={{ marginRight: 10 }}></input>
                Remember me
              </StyledLabel>
            </StyledInputGroup>
            <StyledInputGroup>
              {selector.logging_in ? (
                <StyledButton disabled primary>
                  Logging in...
                </StyledButton>
              ) : (
                <StyledButton primary>LOGIN</StyledButton>
              )}
            </StyledInputGroup>
            <div style={{ textAlign: "right", marginTop: 10 }}>
              Create an account ?
              <Link style={{ color: "#42c2ff" }} to={"/signup"}>
                {" "}
                Signup{" "}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </StyledLoginWrapper>
  );
};
export default Login;
