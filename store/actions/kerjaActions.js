import axios from "axios";
import { API } from "../../config";

import actions from "./index";

export const getAllExperiences = () => async dispatch => {
  const experiences = await axios.get(`${API}/experiences`);
  console.log('experiences =', experiences)
  return dispatch({ type: actions.GET_ALL_EXPERIENCES, experiences: experiences.data });
};

export const getExperienceById = (id) => async dispatch => {
  const experience = await axios.get(`${API}/experiences?id=${id}`);
  return dispatch({ type: actions.GET_EXPERIENCE_BY_ID, experience: experience.data });
};