import { configureStore } from "@reduxjs/toolkit";
import session from "./src/features/session";
import clients from "./src/features/clients";
import placesState from "./src/features/filters/placesState";

export const store = configureStore({
  reducer: {
    session,
    clients,
    placesState,
  },
});
