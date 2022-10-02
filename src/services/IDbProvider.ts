import { IGetAppVersion } from "../interface/IGetAppVersion";
import {
  IAppPostRation,
  IAppPostRationElastic,
  IGetRation,
  IGetRationElastic,
  IRation,
} from "../interface/IRation";

export interface IDbProvider {
  getRation(id: string): Promise<IGetRation>;
  addRation(obj: IAppPostRation): Promise<number>;
  getCurrentAppVersion(): Promise<IGetAppVersion>;
  addRationElastic(obj: IAppPostRationElastic): Promise<number>;
  getRationElastic(id: string): Promise<IAppPostRationElastic>;
}
