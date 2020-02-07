import axios from "axios";
import { API } from "../../config";

import actions from "./index";

export const getAllFinalTasks = () => async dispatch => {
  const finalTasks = await axios.get(`${API}/finalTask`);
  return dispatch({ type: actions.GET_ALL_FINAL_TASKS, finalTasks: finalTasks.data });
};

export const getFinalTaskById = (id) => async dispatch => {
  const finalTask = await axios.get(`${API}/finalTask?id=${id}`);
  console.log(finalTask);
  return dispatch({ type: actions.GET_FINAL_TASK_BY_ID, finalTask: finalTask.data });
};