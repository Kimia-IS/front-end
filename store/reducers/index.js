import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import akademikReducer from "./akademikReducer";

export default combineReducers({
  usersReducer,
  akademikReducer
});