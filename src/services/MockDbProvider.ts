import { delayResult } from "../helpers/HelperFunction";
import { IGetAppVersion } from "../interface/IGetAppVersion";
import { IAppPostRation, IGetRation, IRation } from "../interface/IRation";
import { IDbProvider } from "./IDbProvider";

export class MockDbProvider implements IDbProvider {
  getCurrentAppVersion(): Promise<IGetAppVersion> {
      throw new Error("Method not implemented.");
  }
  addRation(obj: IAppPostRation): Promise<number> {
      throw new Error("Method not implemented.");
  }
  async getRation(id: string): Promise<IGetRation> {
    const getString =
      '{"json":"{"name":"fdsfdsfdsfasddsf","sex":"fdsfds","selectedFitnessChoice":"Нет","preferencesState":[{"isChecked":true,"label":"Мясные изделия"},{"isChecked":false,"label":"Овощи"},{"isChecked":false,"label":"Фрукты"},{"isChecked":false,"label":"Молочные продукты"}],"comments":"fdsaf","selectedMonthWithdrawal":5000,"selectedStartDate":"2022-09-26T21:00:00.000Z"}","keywords":"hi, hehe","appVersionId":2,"appVersion":null,"id":1,"dateCreated":"2022-09-24T19:21:54.1883344"}';
    const Ration: IGetRation = JSON.parse(getString);
    console.log("Ration: ", Ration.json);
    return delayResult<IGetRation>(Ration, 500);
  }

  
}
