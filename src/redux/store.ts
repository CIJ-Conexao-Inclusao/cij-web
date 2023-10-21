import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    userReducer,
  },
  middleware: [logger],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
