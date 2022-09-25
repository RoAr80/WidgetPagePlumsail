// import { ShowFeedbackToUserModal } from "../helpers/ShowFeedbackToUserModal";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppSliceState {
  appVersionId?: number;
  rationId?: string;
}

const initialState: AppSliceState = {};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setAppVersion: (state, action: PayloadAction<number>) => {
      state.appVersionId = action.payload;
    },
    setRationId: (state, action: PayloadAction<string>) => {
      state.rationId = action.payload;
    }
  },
});

export const { setAppVersion, setRationId } = appSlice.actions;

export default appSlice.reducer;
