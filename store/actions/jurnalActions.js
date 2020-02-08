import axios from "axios";
import { API } from "../../config";

import actions from "./index";

export const getAllJournals = () => async dispatch => {
  const journals = await axios.get(`${API}/publication/journal`);
  console.log('journals = ' + journals)
  return dispatch({ type: actions.GET_ALL_JOURNALS, journals: journals.data });
};

export const getJournalById = (id) => async dispatch => {
  const journal = await axios.get(`${API}/publication/journal?id=${id}`);
  console.log(journal);
  return dispatch({ type: actions.GET_JOURNAL_BY_ID, journal: journal.data });
};