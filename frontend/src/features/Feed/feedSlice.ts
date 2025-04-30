import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
//export const {} = feedSlice.actions;

export default feedSlice.reducer;
