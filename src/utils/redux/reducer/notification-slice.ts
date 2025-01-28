import { createSlice } from "@reduxjs/toolkit";

interface NotificationState {
  isNotificationOpen: boolean;
  message: string;
  severity: string;
}

const notificationSlice = createSlice({
  name: "authenticationSlice",
  initialState: {
    message: "",
    severity: "",
    isNotificationOpen: false,
  } as NotificationState,
  reducers: {
    showNotification(state, action) {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.isNotificationOpen = true;
    },
    hideNotification(state) {
      state.isNotificationOpen = false;
    },
  },
});

export default notificationSlice.reducer;

export const { showNotification, hideNotification } = notificationSlice.actions;

export const IsNotificationOpen = (state: {
  notificationSlice: NotificationState;
}) => state.notificationSlice.isNotificationOpen;

export const Severity = (state: { notificationSlice: NotificationState }) =>
  state.notificationSlice.severity;

export const NotificationMessage = (state: {
  notificationSlice: NotificationState;
}) => state.notificationSlice.message;
