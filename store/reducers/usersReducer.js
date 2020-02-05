import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_USERS:
      return { ...state, users: action.users };

    case actions.GET_USER_BY_ID:
      return { ...state, user: action.user };

    //case actions.LOGIN:
    //  return { ...state, self: action.self };

    default:
      return state;
  }
};