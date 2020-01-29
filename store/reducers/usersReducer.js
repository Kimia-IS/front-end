import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_TEST:
      return { ...state, users: action.users };

    /*case actions.GET_USER:
      return { ...state, user: action.user };*/

    default:
      return state;
  }
};