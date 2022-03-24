import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authenticatioinReducer from "../features/authentication/authenticationSlice";
import teamReducer from "../features/teams/teamSlice";
export const store = configureStore({
  devTools: true,
  reducer: {
    counter: counterReducer,
    authentication: authenticatioinReducer,
    team: teamReducer,
  },
});
