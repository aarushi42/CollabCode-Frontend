import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    setPremium: (state) => {
      if (state) {
        state.isPremium = true;
      }
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, setPremium, removeUser } = userSlice.actions;

export default userSlice.reducer;
