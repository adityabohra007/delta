// import { userActionTypes } from "../constants/user.constants";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { loggedIn: true, user }
  : { loading: "idle", errors: {} };

export const signupAsync = createAsyncThunk(
  "authentication/signupUser",
  async (data, ThunkApi) => {
    // ThunkApi.dispatch()
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const config = {
        apiUrl: "http://127.0.0.1:8000",
      };
      const response = await fetch(
        `${config.apiUrl}/api/registration/`,
        requestOptions
      ).then((res) =>
        res.json().then((data) => ({ status: res.status, body: data }))
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);
export const loginAsync = createAsyncThunk(
  "authentication/loginUser",
  async (data, ThunkApi) => {
    // ThunkApi.dispatch()
    const { username, password } = data;
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      };
      const config = {
        apiUrl: "http://127.0.0.1:8000",
      };
      const response = await fetch(
        `${config.apiUrl}/api/login/`,
        requestOptions
      ).then((res) =>
        res.json().then((data) => ({ status: res.status, body: data }))
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);
export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    signup_request: (state) => {
      state.signing_up = true;
    },
    signup_success: (state, action) => {
      state.signed_up = true;
      state.user = action.user;
    },
    signup_failure: (state) => {
      state.signed_up = false;
    },

    login_error_clear: (state) => {
      state.login_error = [];
    },
    login_request: (state) => {
      state.loggingIn = true;
      state.user = action.user;
    },
    login_success: (state, action) => {
      state.loggedIn = true;
      user = action.user;
    },
    login_failure: (state, action) => {
      state.login_error = { ...action };
      state.loggedIn = false;
    },

    logout: (state) => {
      state.loggedIn = false;
      state.user = {};
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loading = "idle";
      state.login_error = { ...action.payload };
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = "idle";
      if (action.payload.status == 400 && action.payload.body) {
        state.errors = action.payload.body;
      }
      if (action.payload.status == 200) {
        state.loggedIn = true;
        localStorage.setItem("user", JSON.stringify(action.payload.body));
      }
    });
    builder.addCase(signupAsync.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(signupAsync.fulfilled, (state, action) => {
      state.loading = "idle";
      if (action.payload.status == 400 && action.payload.body) {
        state.errors = action.payload.body;
      }
      if (action.payload.status == 201) {
        state.signed_up = true;
        state.loggedIn = true;
        localStorage.setItem("user", JSON.stringify(action.payload.body));
      }
    });
  },
});

export const userObject = (state) => state.user;

export const {
  login_failure,
  login_request,
  login_success,
  logout,
  login_error,
  login_error_clear,
  signup_request,
  signup_success,
  signup_failure,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
