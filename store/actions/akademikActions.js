import axios from "axios";
import { API } from "../../config";

import actions from "./index";

export const getAllAcademics = () => async dispatch => {
  const users = await axios.get(`${API}/id/province`);
  console.log(users.data);
  return dispatch({ type: actions.GET_ACADEMICS, users: users.data });
};

export const createAcademic = () => async dispatch => {
  const users = await axios.get(`${API}/id/province`);
  console.log(users.data);
  return dispatch({ type: actions.GET_TEST, users: users.data });
};

export const editAcademicById = () => async dispatch => {
  const users = await axios.get(`${API}/id/province`);
  console.log(users.data);
  return dispatch({ type: actions.GET_TEST, users: users.data });
};

/*export const getUser = id => async dispatch => {
  const user = await axios.get(`/users/${id}`);
  return dispatch({ type: actions.GET_USER, user: user.data });
};*/