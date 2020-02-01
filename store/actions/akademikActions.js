import axios from "axios";
import { API } from "../../config";

import actions from "./index";

export const getAllCourses = () => async dispatch => {
  const courses = await axios.get(`${API}/academic/lecturer`);
  console.log(courses.data);
  return dispatch({ type: actions.GET_ALL_COURSES, courses: courses.data });
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