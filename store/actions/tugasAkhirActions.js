import axios from "axios";
import { API } from "../../config";

import actions from "./index";

export const getAllFinalTasks = () => async dispatch => {
  const finalTasks = await axios.get(`${API}/finalTask`);
  console.log('dalem actions = ', finalTasks);
  return dispatch({ type: actions.GET_ALL_FINAL_TASKS, finalTasks: finalTasks.data });
};