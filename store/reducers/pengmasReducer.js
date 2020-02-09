import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_SOCRESES:
      return { ...state, socreses: action.socreses };

    case actions.GET_SOCRES_BY_ID:
      return { ...state, socres: action.socres };

    default:
      return state;
  }
};