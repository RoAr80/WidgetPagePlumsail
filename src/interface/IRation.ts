import { DietState } from "../features/dietSlice";
import { IPreferenceCheckbox } from "./IPreferenceCheckbox";

// export interface IRation{
//     name: string;
//     sex: string;
//     selectedFitnessChoice: string;
//     preferencesState: IPreferenceCheckbox[];
//     comments: string;
//     selectedMonthWithdrawal: number;
//     selectedStartDate: Date;
// }

export type IRation = Pick<
  DietState,
  | "name"
  | "sex"
  | "selectedFitnessChoice"
  | "selectedMonthWithdrawal"
  | "selectedStartDate"
  | "comments"
  | "preferencesState"
>;

export interface IPostRation {
  Json: string;
  Keywords: string;
  AppVersionId: number;
}

export interface IGetRation {
  json: string;
  keywords: string;
  appVersionId: number;
  id: number;
  dateCreated: string;
}

export interface IAppPostRation {
  ration: IRation;
  keywords: string;
  appVersionId: number;
}
