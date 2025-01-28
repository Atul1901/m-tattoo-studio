import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  selectedShopId: string;
}

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    selectedShopId: "",
  } as AppState,
  reducers: {
    updateSelectedShopId(state, action: PayloadAction<{ shopId: string }>) {
      state.selectedShopId = action.payload.shopId;
    },
  },
});

export default appSlice.reducer;

export const { updateSelectedShopId } = appSlice.actions;

export const SelectedShopId = (state: { appSlice: AppState }) =>
  state.appSlice.selectedShopId;
