import axios from "axios";
import { API } from "../../config";

import actions from "./index";

export const getAllResearches = () => async dispatch => {
  const researches = await axios.get(`${API}/research`);
  return dispatch({ type: actions.GET_ALL_RESEARCHES, researches: researches.data });
};

export const getResearchById = (id) => async dispatch => {
  const research = await axios.get(`${API}/research?id=${id}`);
  return dispatch({ type: actions.GET_RESEARCH_BY_ID, research: research.data });
};