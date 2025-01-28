import {
  Authenticated,
  logOut,
  setAuthentication,
} from "./reducer/authentication-slice";
import {
  hideNotification,
  IsNotificationOpen,
  NotificationMessage,
  Severity,
  showNotification,
} from "./reducer/notification-slice";
import store from "./store";

export default store;

export {
  setAuthentication,
  Authenticated,
  logOut,
  showNotification,
  IsNotificationOpen,
  hideNotification,
  Severity,
  NotificationMessage,
};

export const handleLogout = () => {
  store.dispatch(logOut());
};
