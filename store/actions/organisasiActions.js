import axios from "axios";
import { API } from "../../config";

import actions from "./index";

export const getAllOrganizations = () => async dispatch => {
  const organizations = await axios.get(`${API}/organizations`);
  console.log('organizations =', organizations)
  return dispatch({ type: actions.GET_ALL_ORGANIZATIONS, organizations: organizations.data });
};

export const getOrganizationById = (id) => async dispatch => {
  const organization = await axios.get(`${API}/organizations?id=${id}`);
  return dispatch({ type: actions.GET_ORGANIZATION_BY_ID, organization: organization.data });
};