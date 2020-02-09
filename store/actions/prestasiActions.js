import axios from "axios";
import { API } from "../../config";

import actions from "./index";

export const getAllAchievements = () => async dispatch => {
  const achievements = await axios.get(`${API}/achievements`);
  console.log('achievements =', achievements)
  return dispatch({ type: actions.GET_ALL_ACHIEVEMENTS, achievements: achievements.data });
};

export const getAchievementById = (id) => async dispatch => {
  const achievement = await axios.get(`${API}/achievements?id=${id}`);
  return dispatch({ type: actions.GET_ACHIEVEMENT_BY_ID, achievement: achievement.data });
};