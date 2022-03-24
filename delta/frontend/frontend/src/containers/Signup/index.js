import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Notify,
  StyledButton,
  StyledInput,
  StyledInputGroup,
} from "../../components/StyledInput";
import { useNavigate } from "react-router-dom";
import { StyledLabel } from "../../components/StyledInput";
import {
  logout,
  signupAsync,
} from "../../features/authentication/authenticationSlice";
import { StyledLoginWrapper } from "./Styled";

const Signup = () => {
  const [userAuth, setUserAuth] = useState({
    username: "",
    password1: "",
    password2: "",
    submitted: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(logout());
    console.log(selector);
  }, []);
  if (selector.signed_up) {
    navigate("/");
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserAuth({ ...userAuth, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserAuth({ ...userAuth, submitted: true });
    const { username, password1, password2 } = userAuth;
    console.log(username, password1);
    if (username && password1 && password2) {
      dispatch(signupAsync(userAuth));
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
          <div className="heading">Signup </div>
          <div>Welcome! Signup to create and manage your team. </div>
          <form onSubmit={handleSubmit} style={{ marginTop: 165 }}>
            {userAuth.submitted && !userAuth.password1 && (
              <Notify error> Password is required </Notify>
            )}
            {userAuth.submitted && !userAuth.password2 && (
              <Notify error> Confirm Password is required </Notify>
            )}

            {selector.errors && selector.errors.non_field_errors && (
              <Notify error>{selector.errors.non_field_errors[0]}</Notify>
            )}

            {userAuth.submitted && !userAuth.username && (
              <Notify error> Username is required </Notify>
            )}
            {/* Username */}
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
            {/* Password */}
            <StyledInputGroup>
              <StyledLabel>Password</StyledLabel>
              <StyledInput
                style={
                  userAuth.submitted && !userAuth.password1
                    ? { borderColor: "red" }
                    : {}
                }
                value={userAuth.password1}
                onChange={handleChange}
                name="password1"
                placeholder="Enter your password"
                type={"password"}
              ></StyledInput>
            </StyledInputGroup>
            <StyledInputGroup>
              <StyledLabel>Confirm Password</StyledLabel>
              <StyledInput
                style={
                  userAuth.submitted && !userAuth.password2
                    ? { borderColor: "red" }
                    : {}
                }
                value={userAuth.password2}
                onChange={handleChange}
                name="password2"
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
              {selector.loading == "loading" ? (
                <StyledButton primary disabled>
                  Signing up...
                </StyledButton>
              ) : (
                <StyledButton primary>Sign Up</StyledButton>
              )}
            </StyledInputGroup>
          </form>
        </div>
      </div>
    </StyledLoginWrapper>
  );
};
export default Signup;
