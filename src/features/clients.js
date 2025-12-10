import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clients: [],
  selectedClient: null,
  clientPaymentHistory: [],
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addClients(state, action) {
      state.clients = action.payload;
    },

    addSelectedClient(state, action) {
      state.selectedClient = action.payload;
    },

    clearSelectedClient(state) {
      state.selectedClient = null;
    },

    updateClientField(state, action) {
      const { id, field, value } = action.payload;

      const clientIndex = state.clients.findIndex((c) => c.client_id === id);

      if (clientIndex !== -1) {
        state.clients[clientIndex][field] = value;
      }
    },
    addClientPaymentHistory(state, action) {
      state.clientPaymentHistory = action.payload;
    },
  },
});

export const {
  addClients,
  addSelectedClient,
  clearSelectedClient,
  updateClientField,
  addClientPaymentHistory,
} = clientsSlice.actions;

export default clientsSlice.reducer;
