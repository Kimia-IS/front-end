import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_FINAL_TASKS:
      return { ...state, finalTasks: action.finalTasks };

    case actions.GET_FINAL_TASK_BY_ID:
      return { ...state, finalTask: action.finalTask };

    default:
      return state;
  }
};