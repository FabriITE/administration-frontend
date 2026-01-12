import { configureStore } from "@reduxjs/toolkit";
import session from "./src/features/session";
import clients from "./src/features/clients";
import placesState from "./src/features/filters/placesState";
import monthInfo from "./src/features/monthInfo";
import notifications from "./src/features/notifications";

export const store = configureStore({
  reducer: {
    session,
    clients,
    placesState,
    monthInfo,
    notifications,
  },
});
