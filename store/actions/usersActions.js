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

export const getUserById = (id, role) => async dispatch => {
  console.log(id);
  console.log(role);
  const res = await axios.get(`${API}/auth/user?id=${id}&role=${role}`);
  console.log('res = ', res.data);
  let user = res.data.results;
  if (user.role == 'Super Admin') { user.role = 1 }
	else if (user.role == 'Admin Akademik') { user.role = 2 }
	else if (user.role == 'Admin Non-Akademik') { user.role = 3 }
	else if (user.role == 'Tendik') { user.role = 4 }
	else if (user.role == 'Dosen') { user.role = 5 }
	else if (user.role == 'Kaprodi') { user.role = 6 }
	else { user.role = 0 }
  console.log('user = ', user);
  return dispatch({ type: actions.GET_USER_BY_ID, user: user });
};