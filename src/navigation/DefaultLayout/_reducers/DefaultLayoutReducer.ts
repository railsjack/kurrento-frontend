import {SET_APP_BASE_DATA, SET_USER_PROFILE_DATA} from "../_actions/_action-types";

const initialState = {
  data: {}
}
export const AppBaseData = (state = initialState, data: any) => {
  switch (data.type) {
    case SET_APP_BASE_DATA:
      return Object.assign({}, state, {vendorArray: data.data})
    case SET_USER_PROFILE_DATA:
      return Object.assign({}, state, {profileData: data.data});
    default:
      return state
  }
}
