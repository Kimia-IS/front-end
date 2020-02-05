import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import akademikReducer from "./akademikReducer";
import tugasAkhirReducer from "./tugasAkhirReducer";

export default combineReducers({
  usersReducer,
  akademikReducer,
  tugasAkhirReducer
});