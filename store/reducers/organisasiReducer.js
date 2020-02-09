import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_ORGANIZATIONS:
      return { ...state, organizations: action.organizations };

    case actions.GET_ORGANIZATION_BY_ID:
      return { ...state, organization: action.organization };

    default:
      return state;
  }
};