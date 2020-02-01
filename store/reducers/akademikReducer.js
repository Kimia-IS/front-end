import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_COURSES:
      return { ...state, courses: action.courses };

    /*case actions.GET_USER:
      return { ...state, user: action.user };*/

    default:
      return state;
  }
};