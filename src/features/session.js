import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "",
  username: "",
  color: "",
  name: "",
  employee_id: "",
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    addSession(state, action) {
      return {
        ...action.payload,
      };
    },
  },
});

export const { addSession } = sessionSlice.actions;
export default sessionSlice.reducer;
