import axios from "axios";
import { API } from "../../config";

import actions from "./index";

export const getAllPatents = () => async dispatch => {
  const patents = await axios.get(`${API}/publication/patent`);
  console.log('patents =', patents)
  return dispatch({ type: actions.GET_ALL_PATENTS, patents: patents.data });
};

export const getPatentById = (id) => async dispatch => {
  const patent = await axios.get(`${API}/publication/patent?id=${id}`);
  return dispatch({ type: actions.GET_PATENT_BY_ID, patent: patent.data });
};