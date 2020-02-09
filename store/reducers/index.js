import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import akademikReducer from "./akademikReducer";
import tugasAkhirReducer from "./tugasAkhirReducer";
import penelitianReducer from "./penelitianReducer";
import jurnalReducer from "./jurnalReducer";
import patenReducer from "./patenReducer";
import karyaReducer from "./karyaReducer";
import prestasiReducer from "./prestasiReducer";
import kerjaReducer from "./kerjaReducer";
import pengmasReducer from "./pengmasReducer";
import organisasiReducer from "./organisasiReducer";

export default combineReducers({
  usersReducer,
  akademikReducer,
  tugasAkhirReducer,
  penelitianReducer,
  jurnalReducer,
  patenReducer,
  karyaReducer,
  prestasiReducer,
  kerjaReducer,
  pengmasReducer,
  organisasiReducer
});