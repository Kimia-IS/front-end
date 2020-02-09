import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_PATENTS:
      return { ...state, patents: action.patents };

    case actions.GET_PATENT_BY_ID:
      return { ...state, patent: action.patent };

    default:
      return state;
  }
};