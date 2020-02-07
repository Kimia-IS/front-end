import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import akademikReducer from "./akademikReducer";
import tugasAkhirReducer from "./tugasAkhirReducer";
import penelitianReducer from "./penelitianReducer";

export default combineReducers({
  usersReducer,
  akademikReducer,
  tugasAkhirReducer,
  penelitianReducer
});