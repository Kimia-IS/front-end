import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_EXPERIENCES:
      return { ...state, experiences: action.experiences };

    case actions.GET_EXPERIENCE_BY_ID:
      return { ...state, experience: action.experience };

    default:
      return state;
  }
};