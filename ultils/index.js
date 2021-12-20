import { Constant } from "./Constant";
import { LocalStorage } from "./LocalStorage";
import { validateLoginData, validateSignupData } from "./ValidateData";
import { convertDateToString } from "./DateUtils";
import { vh, vw } from "./DeviceSize";
const { getData, storeData, removeAlldata } = LocalStorage;
export {
  getData,
  storeData,
  removeAlldata,
  validateLoginData,
  validateSignupData,
  convertDateToString,
  vh,
  vw,
};
