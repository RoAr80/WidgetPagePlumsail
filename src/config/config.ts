import { DEVELOPMENT_ENV, LOCAL_ENV, PRODUCTION_ENV } from "../consts/environmentTypes";
import { DbProvider } from "../services/DbProvider";
import { IDbProvider } from "../services/IDbProvider";
import { MockDbProvider } from "../services/MockDbProvider";

const SERVICE_URL_LOCAL = "https://localhost:44311/";

export let serviceUrl = SERVICE_URL_LOCAL;

export let dbProvider: IDbProvider;

(function initConfig() {
  if (process.env.REACT_APP_NODE_ENV === LOCAL_ENV) {
    dbProvider = new DbProvider();
  } else if (process.env.REACT_APP_NODE_ENV === DEVELOPMENT_ENV) {
    dbProvider = new DbProvider();
  } else if (process.env.REACT_APP_NODE_ENV === PRODUCTION_ENV) {
    dbProvider = new DbProvider();
  }
  else{
      dbProvider = new DbProvider();
  }
})();