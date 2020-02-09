import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_JOURNALS:
      return { ...state, journals: action.journals };

    case actions.GET_JOURNAL_BY_ID:
      return { ...state, journal: action.journal };

    default:
      return state;
  }
};