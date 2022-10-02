import {
  Checkbox,
  ChoiceGroup,
  DatePicker,
  DefaultButton,
  Dropdown,
  IChoiceGroupOption,
  IDropdownOption,
  Label,
  Stack,
  TextField,
} from "@fluentui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { dbProvider } from "../../config/config";
import {
  setComments,
  setName,
  setPreferencesState,
  setPreferencesStateItem,
  setSelectedFitnessChoice,
  setSelectedMonthWithdrawal,
  setSelectedStartDate,
  setSex,
} from "../../features/dietSlice";
import { ValidatorOptions } from "../../helpers/ValidatorOptions";
import { IPreferenceCheckbox } from "../../interface/IPreferenceCheckbox";
import { IAppPostRation, IAppPostRationElastic, IRation } from "../../interface/IRation";
import style from "./WidgetPage.module.css";

const fitnessOptions: IChoiceGroupOption[] = [
  { key: "Да", text: "Да" },
  { key: "Нет", text: "Нет" },
];

const monthlyWithdrawalOptions: IDropdownOption[] = [
  { key: 5000, text: "~5000" },
  { key: 10000, text: "~10000" },
  { key: 15000, text: "~15000" },
  { key: 20000, text: "~20000" },
  { key: 25000, text: "~25000" },
];

export default function WidgetPage() {
  const dispatch = useAppDispatch();
  const rationId = useAppSelector((state) => state.app.rationId);
  const appVersionId = useAppSelector((state) => state.app.appVersionId);
  const name = useAppSelector((state) => state.diet.name);
  const sex = useAppSelector((state) => state.diet.sex);
  const comments = useAppSelector((state) => state.diet.comments);
  const selectedFitnessChoice = useAppSelector(
    (state) => state.diet.selectedFitnessChoice
  );
  const selectedMonthWithdrawal = useAppSelector(
    (state) => state.diet.selectedMonthWithdrawal
  );
  const selectedStartDate = useAppSelector(
    (state) => state.diet.selectedStartDate
  );
  const preferencesState = useAppSelector(
    (state) => state.diet.preferencesState
  );
  const [validator] = useState(
    () => new SimpleReactValidator(ValidatorOptions())
  );

  function onNameTextFieldChange(
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) {
    dispatch(setName(newValue || ""));
  }

  function onSexTextFieldChange(
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) {
    dispatch(setSex(newValue || ""));
  }

  function onCommentsTextFieldChange(
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) {
    dispatch(setComments(newValue || ""));
  }

  const onFitnessSelectionChange = React.useCallback(
    (
      ev: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
      option?: IChoiceGroupOption | undefined
    ) => {
      if (!option) return;
      dispatch(setSelectedFitnessChoice(option.key));
    },
    []
  );

  const onMonthlyWithdrawalDropdownChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption | undefined,
    index?: number | undefined
  ) => {
    if (option && option.key)
      dispatch(setSelectedMonthWithdrawal(option.key as number));
  };

  const onStartDateSelect = (date: Date | null | undefined) => {
    if (!date) return;
    dispatch(setSelectedStartDate(date));
  };

  const onPreferenceStateChange = (
    e: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
    v: boolean | undefined,
    index: number
  ) => {
    if (v === undefined) return;
    dispatch(setPreferencesStateItem({ index: index, value: v }));
  };

  const [value, setValue] = useState(0); // integer state

  const onSubmitForm = () => {
    if (!validator.allValid()) {
      validator.showMessages();
      setValue(value + 1);
      return;
    }    
    const obj: IAppPostRationElastic = {
      appVersionId: appVersionId!,
      comments: comments,
      name: name,
      preferencesState: preferencesState.filter(item => item.isChecked === true).map(item => item.label),
      selectedFitnessChoice: selectedFitnessChoice,
      sex: sex,
      selectedMonthWithdrawal: selectedMonthWithdrawal ?? 0,
      selectedStartDate: selectedStartDate ?? new Date(),
    };
    dbProvider.addRationElastic(obj);
  };

  function createKeywords(ration: IRation): string {
    const keywords: string[] = [];
    keywords.push(ration.name);
    keywords.push(ration.sex);
    keywords.push(ration.comments);
    keywords.push(ration.selectedFitnessChoice);
    keywords.push(ration.selectedMonthWithdrawal?.toString() ?? "");
    keywords.push(moment(ration.selectedStartDate).format("YYYY-MM-DD"));
    var selectedPreferences = ration.preferencesState.filter(
      (item) => item.isChecked === true
    );
    for (let i = 0; i < selectedPreferences.length; i++) {
      keywords.push(selectedPreferences[i].label);
    }
    return keywords.join(" ");
  }

  return (
    <Stack className={style.container} tokens={{ childrenGap: 10 }}>
      <Stack horizontal>
        <Stack className={style.leftContainer}>
          <Label>AppVersionId: </Label>
        </Stack>
        <Stack className={style.rightContainer}>{appVersionId}</Stack>
      </Stack>
      <Stack horizontal>
        <Stack className={style.leftContainer}>
          <Label>ФИО</Label>
        </Stack>
        <Stack className={style.rightContainer}>
          <TextField value={name} onChange={onNameTextFieldChange} />
          {validator.message("ФИО", name, "required")}
        </Stack>
      </Stack>
      <Stack horizontal>
        <Stack className={style.leftContainer}>
          <Label>Пол</Label>
        </Stack>
        <Stack className={style.rightContainer}>
          <TextField value={sex} onChange={onSexTextFieldChange} />
          {validator.message("ПОЛ", sex, "required")}
        </Stack>
      </Stack>
      <Stack horizontal>
        <Stack className={style.leftContainer}>
          <Label>Абонемент в фитнес зал?</Label>
        </Stack>
        <Stack className={style.rightContainer}>
          <ChoiceGroup
            selectedKey={selectedFitnessChoice}
            options={fitnessOptions}
            onChange={onFitnessSelectionChange}
          />
          {validator.message("Фитнес", selectedFitnessChoice, "required")}
        </Stack>
      </Stack>
      <Stack horizontal>
        <Stack className={style.leftContainer}>
          <Label>Месячная трата на продукты</Label>
        </Stack>
        <Stack className={style.rightContainer}>
          <Dropdown
            options={monthlyWithdrawalOptions}
            onChange={onMonthlyWithdrawalDropdownChange}
            selectedKey={selectedMonthWithdrawal}
            placeholder="Выбрать"
          />
          {validator.message(
            "Месячная трата",
            selectedMonthWithdrawal,
            "required"
          )}
        </Stack>
      </Stack>
      <Stack horizontal>
        <Stack className={style.leftContainer}>
          <Label>Когда начнём?</Label>
        </Stack>
        <Stack className={style.rightContainer}>
          <DatePicker
            formatDate={(date?: Date) => moment(date).format("YYYY-MM-DD")}
            onSelectDate={onStartDateSelect}
            value={selectedStartDate}
            minDate={new Date()}
          />
          {validator.message("StartDate", selectedStartDate, "required")}
        </Stack>
      </Stack>
      <Stack horizontal>
        <Stack className={style.leftContainer}>
          <Label>Предпочтения</Label>
        </Stack>
        <Stack className={style.rightContainer} tokens={{ childrenGap: 10 }}>
          {preferencesState.map((pref, i) => {
            return (
              <Checkbox
                checked={pref.isChecked}
                label={pref.label}
                key={pref.label}
                onChange={(e, v) => onPreferenceStateChange(e, v, i)}
              />
            );
          })}
          {validator.message("PrefState", preferencesState, "isOneChecked")}
        </Stack>
      </Stack>
      <Stack horizontal>
        <Stack className={style.leftContainer}>
          <Label>Комментарии</Label>
        </Stack>
        <Stack className={style.rightContainer}>
          <TextField
            multiline
            resizable={false}
            value={comments}
            onChange={onCommentsTextFieldChange}
          />
          {validator.message("Comments", comments, "required")}
        </Stack>
      </Stack>
      <Stack horizontal>
        {!rationId && (
          <DefaultButton onClick={onSubmitForm}>Отправить</DefaultButton>
        )}
      </Stack>
    </Stack>
  );
}
