import axios from "axios";
import { API } from "../../config";

import actions from "./index";

export const getAllSocreses = () => async dispatch => {
  const socreses = await axios.get(`${API}/socres`);
  console.log('socreses =', socreses)
  return dispatch({ type: actions.GET_ALL_SOCRESES, socreses: socreses.data });
};

export const getSocresById = (id) => async dispatch => {
  const socres = await axios.get(`${API}/socres?id=${id}`);
  return dispatch({ type: actions.GET_SOCRES_BY_ID, socres: socres.data });
};