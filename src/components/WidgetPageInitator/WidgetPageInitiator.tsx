import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
import { IRation } from "../../interface/IRation";
import WidgetPage from "../WidgetPage/WidgetPage";

export default function WidgetPageInitiator() {
  const formId = useAppSelector((state) => state.app.rationId);
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
      initFormWithId(formId);
      console.log("formIdChanged, ", formId);
    } else {
    }
    return () => window.removeEventListener("message", receiveMessage);
  }, [formId]);

  async function initFormWithId(formId: string) {
    const getRationDb = await dbProvider.getRation(formId);
    const jsonRation = await (await dbProvider.getRation(formId)).json;
    const ration: IRation = JSON.parse(jsonRation);
    console.log("ration: ", ration);
    dispatch(setName(ration.name));
    dispatch(setSex(ration.sex));
    dispatch(setSelectedFitnessChoice(ration.selectedFitnessChoice));
    dispatch(setSelectedMonthWithdrawal(ration.selectedMonthWithdrawal));
    dispatch(setSelectedStartDate(ration.selectedStartDate));
    dispatch(setPreferencesState(ration.preferencesState));
    dispatch(setComments(ration.comments));
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
