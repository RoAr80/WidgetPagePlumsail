// import { ShowFeedbackToUserModal } from "../helpers/ShowFeedbackToUserModal";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArrayItemChange } from "../interface/IArrayItemChange";
import { IPreferenceCheckbox } from "../interface/IPreferenceCheckbox";

export interface DietState {
  name: string;
  sex: string;
  selectedFitnessChoice: string;
  selectedMonthWithdrawal?: number;
  selectedStartDate?: Date;
  comments: string;
  preferencesState: IPreferenceCheckbox[];
}

const initialState: DietState = {
  name: "",
  sex: "",
  selectedFitnessChoice: "",
  preferencesState: [
    { isChecked: false, label: "Мясные" },
    { isChecked: false, label: "Овощи" },
    { isChecked: false, label: "Фрукты" },
    { isChecked: false, label: "Молочные продукты" },
  ],
  comments: "",
};

export const dietSlice = createSlice({
  name: "dietSlice",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSex: (state, action: PayloadAction<string>) => {
      state.sex = action.payload;
    },
    setSelectedFitnessChoice: (state, action: PayloadAction<string>) => {
      state.selectedFitnessChoice = action.payload;
    },
    setSelectedMonthWithdrawal: (state, action: PayloadAction<number | undefined>) => {
      state.selectedMonthWithdrawal = action.payload;
    },
    setSelectedStartDate: (state, action: PayloadAction<Date | undefined>) => {
      state.selectedStartDate = action.payload;
    },
    setPreferencesStateItem: (
      state,
      action: PayloadAction<IArrayItemChange<boolean>>
    ) => {
      state.preferencesState[action.payload.index].isChecked =
        action.payload.value;
    },
    setPreferencesState: (state, action: PayloadAction<IPreferenceCheckbox[]>) => {
      state.preferencesState = action.payload;
    },
    setComments: (state, action: PayloadAction<string>) => {
      state.comments = action.payload;
    },
  },
});

export const {
  setName,
  setSex,
  setSelectedFitnessChoice,
  setSelectedMonthWithdrawal,
  setSelectedStartDate,
  setPreferencesStateItem,
  setComments,
  setPreferencesState
} = dietSlice.actions;

export default dietSlice.reducer;
