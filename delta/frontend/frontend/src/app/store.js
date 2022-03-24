import { configureStore } from "@reduxjs/toolkit";
import authenticatioinReducer from "../features/authentication/authenticationSlice";
import teamReducer from "../features/teams/teamSlice";
export const store = configureStore({
  devTools: true,
  reducer: {
    authentication: authenticatioinReducer,
    team: teamReducer,
  },
});
