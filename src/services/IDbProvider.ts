import { IGetAppVersion } from "../interface/IGetAppVersion";
import { IAppPostRation, IGetRation, IRation } from "../interface/IRation";

export interface IDbProvider {
    getRation(id: string): Promise<IGetRation>
    addRation(obj: IAppPostRation): Promise<number>
    getCurrentAppVersion(): Promise<IGetAppVersion>
}
