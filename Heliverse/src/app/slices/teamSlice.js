import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teams: [],
  selectedTeam: { name: "", id: "" },
};
const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {

    setTeams: (state, action) => {
      return { ...state, teams: action.payload };
    },

    setSelectedTeam: (state, action) => {
      return { ...state, selectedTeam: action.payload };
    }
  },
});

export const {
  addToSelection,
  removeFromSelection,
  setSelectedTeam,
  setTeams,
} = teamSlice.actions;
export default teamSlice.reducer;
