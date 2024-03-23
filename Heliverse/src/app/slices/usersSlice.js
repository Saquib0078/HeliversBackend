import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersList: [],
    page: 1,
    totalPages: 1,
    searchQuery: "",
    filters: {
      domain: "",
      availability: null,
      gender: "",
    },
  },
  reducers: {
    setUsersList(state, action) {
      state.usersList = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  setUsersList,
  setPage,
  setTotalPages,
  setSearchQuery,
  setFilters,
} = usersSlice.actions;
export default usersSlice.reducer;
