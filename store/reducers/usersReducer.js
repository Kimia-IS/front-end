import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_USERS:
      return { ...state, users: action.users };

    default:
      return state;
  }
};