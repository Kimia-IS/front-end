import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ACADEMICS:
      return { ...state, academics: action.academics };

    /*case actions.GET_USER:
      return { ...state, user: action.user };*/

    default:
      return state;
  }
};