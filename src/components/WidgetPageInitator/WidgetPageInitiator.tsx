import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { dbProvider } from "../../config/config";
import { setAppVersion, setRationId } from "../../features/appSlice";
import {
  setComments,
  setName,
  setPreferencesState,
  setSelectedFitnessChoice,
  setSelectedMonthWithdrawal,
  setSelectedStartDate,
  setSex,
} from "../../features/dietSlice";
import { IPreferenceCheckbox } from "../../interface/IPreferenceCheckbox";
import { IRation } from "../../interface/IRation";
import WidgetPage from "../WidgetPage/WidgetPage";

export default function WidgetPageInitiator() {
  const formId = useAppSelector((state: RootState) => state.app.rationId);
  const prefState: IPreferenceCheckbox[] = useAppSelector((state: RootState) => state.diet.preferencesState)
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.addEventListener("message", receiveMessage, false);
    console.log("hi there");
    initForm();
    return () => window.removeEventListener("message", receiveMessage);
  }, []);

  useEffect(() => {
    window.addEventListener("message", receiveMessage, false);
    if (formId) {
    // if("CR8ImoMBN9PDgkFcXBDg"){
      initFormWithId(formId);
      console.log("formIdChanged, ", formId);
    } else {
    }
    return () => window.removeEventListener("message", receiveMessage);
  }, [formId]);

  async function initFormWithId(formId: string) {
    const getRationDb = await dbProvider.getRationElastic(formId);
        
    console.log("ration: ", getRationDb);
    dispatch(setName(getRationDb.name));
    dispatch(setSex(getRationDb.sex));
    dispatch(setSelectedFitnessChoice(getRationDb.selectedFitnessChoice));
    dispatch(setSelectedMonthWithdrawal(getRationDb.selectedMonthWithdrawal));
    dispatch(setSelectedStartDate(getRationDb.selectedStartDate));
    const prefStateFromDb = getRationDb.preferencesState;
    const preferenceState: IPreferenceCheckbox[] | undefined = prefState.map(i => {
      if(prefStateFromDb.includes(i.label)){      
        return {
          isChecked: true,
          label: i.label
        }
      }
      else{
        return {
          isChecked: false,
          label: i.label
        }
      }
    })
    dispatch(setPreferencesState(preferenceState));
    dispatch(setComments(getRationDb.comments));
    dispatch(setAppVersion(getRationDb.appVersionId));
  }

  async function initForm() {
    dbProvider.getCurrentAppVersion().then((res) => {
      dispatch(setAppVersion(res.id));
    });
    console.log("init form");
    if (formId) {
      console.log("init form, form id", formId);
      initFormWithId(formId);
    }
  }

  const receiveMessage = (event: any) => {
    const message = event.data.message;
    const value = event.data.value;    
    console.log("message received value: ", value);
    switch (message) {
      case "getId":
        dispatch(setRationId(value.toString()));
        break;
    }
  };
  return <WidgetPage />;
}
