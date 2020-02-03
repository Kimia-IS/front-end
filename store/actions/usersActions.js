import axios from "axios";
import { API } from "../../config";

import actions from "./index";

export const getAllUsers = () => async dispatch => {
  const lecturers = await axios.get(`${API}/lecturer`);
  console.log('lecturers = ', lecturers.data);
  const admins = await axios.get(`${API}/admin`);
  console.log('admins = ', admins.data);
  let users = [...lecturers.data.results, ...admins.data.results];
  console.log('users = ', users);
  return dispatch({ type: actions.GET_ALL_USERS, users: users });
};