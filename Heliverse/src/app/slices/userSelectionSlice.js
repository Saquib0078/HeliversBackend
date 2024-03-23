import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const userSelectionSlice = createSlice({
  name: "userSelection",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    removeUser: (state, action) => {
      const itemIdToRemove = action.payload.id;
      const updatedState = state.filter((item) => item.id !== itemIdToRemove);
      return updatedState;
    },
    clearSelection: (state, action) => {
      return initialState;
    },
  },
});

export const { addUser, removeUser, clearSelection } =
  userSelectionSlice.actions;
export default userSelectionSlice.reducer;
