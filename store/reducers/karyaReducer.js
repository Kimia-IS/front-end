import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_OTHERS:
      return { ...state, others: action.others };

    case actions.GET_OTHER_BY_ID:
      return { ...state, other: action.other };

    default:
      return state;
  }
};