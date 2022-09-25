import { serviceUrl } from "../config/config";
import { IGetAppVersion } from "../interface/IGetAppVersion";
import { IAppPostRation, IGetRation, IPostRation, IRation } from "../interface/IRation";
import { IDbProvider } from "./IDbProvider";

export class DbProvider implements IDbProvider {
  async addRation(obj: IAppPostRation): Promise<number> {
    const query: string = serviceUrl + "api/ration/addration";
    const objectToSend: IPostRation = {
        AppVersionId: obj.appVersionId,
        Json: JSON.stringify(obj.ration),
        Keywords: obj.keywords
    }

    console.log("objectToSend: ", objectToSend);

    const resp: number = await fetch(query, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(objectToSend),
    })
      .then((response) => {
        console.log("update Report response:", response);
        // console.log("update Report response:", response.json());
        if (!response.ok) {
          response.text().then((text) => {
            
          });
          return response.json();
        }
        return response.json();
      })
      .catch((e) => {
        console.log("update Report catch e:", e);
        return 0;
      });

    return resp;
  }
  async getRation(id: string): Promise<IGetRation> {
    const query: string = serviceUrl + `api/ration/getration?id=${id}`;
    const rationPostGet: IGetRation = await fetch(query)
      .then((response) => {
        return response.json();
      })
      .catch((e) => {        
        return "";
      });

    return rationPostGet;
  }

  async getCurrentAppVersion(): Promise<IGetAppVersion> {
    const query: string = serviceUrl + `api/ration/GetCurrentAppVersion`;
    const rationPostGet: IGetAppVersion = await fetch(query)
      .then((response) => {
        return response.json();
      })
      .catch((e) => {        
        return "";
      });

    return rationPostGet;
  }
}
