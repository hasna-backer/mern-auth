import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  err: false,
};
console.log("initialState.err", initialState.err);
console.log("initialState.loading", initialState.loading);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.err = false;
    },
    signInFailure: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.err = true;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
