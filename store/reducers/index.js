import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import akademikReducer from "./akademikReducer";
import tugasAkhirReducer from "./tugasAkhirReducer";
import penelitianReducer from "./penelitianReducer";
import jurnalReducer from "./jurnalReducer";
import patenReducer from "./patenReducer";

export default combineReducers({
  usersReducer,
  akademikReducer,
  tugasAkhirReducer,
  penelitianReducer,
  jurnalReducer,
  patenReducer,
});