import axios from "axios";
import { API } from "../../config";

import actions from "./index";

export const getAllUsers = () => async dispatch => {
  const lecturers = await axios.get(`${API}/auth/users/lecturer`);
  const admins = await axios.get(`${API}/auth/users/admin`);
  const users = [...lecturers.data.results, ...admins.data.results];
  return dispatch({ type: actions.GET_ALL_USERS, users: users });
};

export const getUserById = (id, role) => async dispatch => {
  const res = await axios.get(`${API}/auth/user?id=${id}&role=${role}`);
  console.log(res)
  const user = res.data.results;
  console.log(user)
  if (user.role == 'Super Admin') { user.role = 1 }
  	else if (user.role == 'Admin Akademik') { user.role = 2 }
  	else if (user.role == 'Admin Non-Akademik') { user.role = 3 }
  	else if (user.role == 'Tendik') { user.role = 4 }
  	else if (user.role == 'Dosen') { user.role = 5 }
  	else if (user.role == 'Kaprodi') { user.role = 6 }
  	else { user.role = 0 }
  return dispatch({ type: actions.GET_USER_BY_ID, user: user });
};

export const getAllLecturers = () => async dispatch => {
  const res = await axios.get(`${API}/auth/users/lecturer`);
  const lecturers = res.data.results;
  return dispatch({ type: actions.GET_ALL_LECTURERS, lecturers: lecturers });
};

export const getProfileById = (id) => async dispatch => {
  const res = await axios.get(`${API}/profile/lecturer:${id}`);
  const profile = res.data.results;
  console.log('profile =', profile);
  return dispatch({ type: actions.GET_PROFILE_BY_ID, profile: profile });
};