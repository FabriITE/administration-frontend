import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active_clients: 0,
  total_charged: 0,
  total_receivable: 0,
};

const monthInfoSlice = createSlice({
  name: "monthInfo",
  initialState,
  reducers: {
    addMonthInfo(state, action) {
      state.active_clients = Number(action.payload.active_clients);
      state.total_charged = Number(action.payload.total_charged);
      state.total_receivable = Number(action.payload.total_receivable);
    },
  },
});

export const { addMonthInfo } = monthInfoSlice.actions;
export default monthInfoSlice.reducer;
