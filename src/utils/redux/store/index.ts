import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "../reducer/authentication-slice";
import notificationSlice from "../reducer/notification-slice";
import userSlice from "../reducer/user-slice";
import appSlice from "../reducer/appState-slice";

const store = configureStore({
  reducer: {
    authenticationSlice,
    notificationSlice,
    userSlice,
    appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
