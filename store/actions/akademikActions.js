import axios from "axios";
import { API } from "../../config";

import actions from "./index";

export const getAllCourses = () => async dispatch => {
  const courses = await axios.get(`${API}/academic/lecturer`);
  console.log(courses.data);
  return dispatch({ type: actions.GET_ALL_COURSES, courses: courses.data });
};

export const createCourse = (payload) => async dispatch => {
  console.log(payload);

  //const users = await axios.get(`${API}/academic/courses`);

  return dispatch({ type: actions.CREATE_COURSE, course: payload });
};

export const createClass = (payload) => async dispatch => {
  console.log('masuk createClass');
  console.log(payload);

  const result = await axios.post(`${API}/academic/courses`, payload)
                        .then(response => {
                          console.log(response);
                        })
                        .catch(error => {
                          console.log(error);
                        });
  console.log(result)

  return dispatch({ type: actions.CREATE_CLASS, course: payload });
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