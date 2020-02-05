import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_FINAL_TASKS:
      return { ...state, finalTasks: action.finalTasks };

    default:
      return state;
  }
};