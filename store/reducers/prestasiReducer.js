import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_ACHIEVEMENTS:
      return { ...state, achievements: action.achievements };

    case actions.GET_ACHIEVEMENT_BY_ID:
      return { ...state, achievement: action.achievement };

    default:
      return state;
  }
};