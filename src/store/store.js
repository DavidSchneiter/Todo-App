import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { toDoSlice } from "./todoConfig/toDoSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    todo: toDoSlice.reducer,
  },
});
