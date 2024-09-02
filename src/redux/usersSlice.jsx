import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload,
    deleteUser: (state, action) =>
      state.filter((user) => user.username !== action.payload),
    updateUser: (state, action) => {
      const index = state.findIndex(
        (user) => user.username === action.payload.username
      );
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
  },
});

export const { setUsers, deleteUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
