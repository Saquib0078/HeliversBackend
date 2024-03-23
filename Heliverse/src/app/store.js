import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import teamSlice from "./slices/teamSlice";
import userSelectionSlice from "./slices/userSelectionSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    team: teamSlice,
    userSelection: userSelectionSlice,
  }
});
