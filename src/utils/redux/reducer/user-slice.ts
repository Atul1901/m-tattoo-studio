import { createSlice } from "@reduxjs/toolkit";
import { fetchFromStorage } from "../../storage";
import { constants } from "../../constants/constants";

interface UserState {
  username: string;
  role: string;
  shopIds: [];
  shopsDetails: [
    {
      _id: string;
      shopName: string;
      location: string;
    }
  ];
}

const role = fetchFromStorage(constants.localStorageItems.role) || "";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    username: "",
    role: role,
    shopIds: [],
    shopsDetails: [
      {
        _id: "",
        shopName: "",
        location: "",
      },
    ],
  } as UserState,
  reducers: {
    setUser(state, action) {
      const { role, username, userId, shopIds } = action.payload;
      state.role = role;
      state.username = username;
      state.shopIds = shopIds;
    },
    setShopsDetails(state, action) {
      const shopsDetails = action.payload;
      state.shopsDetails = shopsDetails;
    },
  },
});

export default userSlice.reducer;

export const { setUser, setShopsDetails } = userSlice.actions;

export const User = (state: { userSlice: UserState }) => state.userSlice;
export const Role = (state: { userSlice: UserState }) => state.userSlice.role;
export const ShopIds = (state: { userSlice: UserState }) =>
  state.userSlice.shopIds;

export const ShopsDetails = (state: { userSlice: UserState }) =>
  state.userSlice.shopsDetails;
