import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clients: [],
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addClients(state, action) {
      state.clients = action.payload;
    },
  },
});

export const { addClients } = clientsSlice.actions;
export default clientsSlice.reducer;
