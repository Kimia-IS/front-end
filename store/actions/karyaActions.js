import axios from "axios";
import { API } from "../../config";

import actions from "./index";

export const getAllOthers = () => async dispatch => {
  const others = await axios.get(`${API}/publication/other`);
  console.log('others =', others)
  return dispatch({ type: actions.GET_ALL_OTHERS, others: others.data });
};

export const getOtherById = (id) => async dispatch => {
  const other = await axios.get(`${API}/publication/other?id=${id}`);
  return dispatch({ type: actions.GET_OTHER_BY_ID, other: other.data });
};