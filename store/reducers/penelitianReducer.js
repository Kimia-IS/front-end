import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_RESEARCHES:
      return { ...state, researches: action.researches };

    case actions.GET_RESEARCH_BY_ID:
      return { ...state, research: action.research };

    default:
      return state;
  }
};