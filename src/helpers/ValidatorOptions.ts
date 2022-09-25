

// TODO: подумать ещё как правильно спереть IOptions. Выглядит ненадёжно

import { IPreferenceCheckbox } from "../interface/IPreferenceCheckbox";

interface IOptions {
  validators?: IRules;
  messages?: any;
  className?: any;
  autoForceUpdate?: any;
  element?: any;
  locale?: string;
}

type IRule =
  | "accepted"
  | "after"
  | "after_or_equal"
  | "alpha"
  | "alpha_space"
  | "alpha_num"
  | " alpha_num_space"
  | "alpha_num_dash"
  | "alpha_num_dash_space"
  | "array"
  | "before"
  | "before_or_equal"
  | "between"
  | "boolean"
  | "card_exp"
  | "card_num"
  | "currency"
  | "date"
  | "date_equals"
  | "email"
  | "in"
  | "integer"
  | "max"
  | "min"
  | "not_in"
  | "not_regex"
  | "numeric"
  | "phone"
  | "regex"
  | "required"
  | "size"
  | "string"
  | "typeof"
  | "url";

interface IRules {
  [key: string]: {
    message: string;
    rule: (val: any, params?: any) => boolean;
  };
}

export const ValidatorOptions = (): IOptions => {
  return {
    validators: {      
      isOneChecked:{
        message: "Выберите хоть один",
        rule: (val: IPreferenceCheckbox[], params: any) =>{
          for(let i = 0; i < val.length; i++){
            if(val[i].isChecked === true)
                return true;
          }
          return false;
          
        }
      }
    },
  };
};
