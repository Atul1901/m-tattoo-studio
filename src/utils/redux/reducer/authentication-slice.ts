import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResponseType } from "../../../services/authentication/interface";
import { constants } from "../../constants/constants";
import { clearStorage, fetchFromStorage } from "../../storage";

interface AuthenticationState {
  authenticated: boolean;
  userId: string;
}

const token = fetchFromStorage(constants.localStorageItems.token) || ""; // need to check if || "" is required
const userId = fetchFromStorage(constants.localStorageItems.userId) || "";

const authenticationSlice = createSlice({
  name: "authenticationSlice",
  initialState: {
    authenticated: !!token,
    userId: userId,
  } as AuthenticationState,
  reducers: {
    setAuthentication(state, action: PayloadAction<LoginResponseType["data"]>) {
      state.authenticated = true;
      state.userId = action.payload.user.userId;
      localStorage.setItem(
        constants.localStorageItems.token,
        action.payload.token
      );
      localStorage.setItem(
        constants.localStorageItems.userId,
        action.payload.user.userId
      );
      localStorage.setItem(
        constants.localStorageItems.role,
        action.payload.user.role
      );
    },
    logOut(state) {
      state.authenticated = false;
      state.userId = "";
      clearStorage();
    },
    updateAuthState(state, action: PayloadAction<AuthenticationState>) {
      state.authenticated = action.payload.authenticated;
      state.userId = action.payload.userId;
    },
  },
});

export default authenticationSlice.reducer;

export const { setAuthentication, logOut, updateAuthState } =
  authenticationSlice.actions;

export const Authenticated = (state: {
  authenticationSlice: AuthenticationState;
}) => state.authenticationSlice.authenticated;

export const UserId = (state: { authenticationSlice: AuthenticationState }) =>
  state.authenticationSlice.userId;
