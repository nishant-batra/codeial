import { APIurls } from "../helpers/url";
import { getAuthTokenFromLocalStorage } from "../helpers/Utils";
import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
} from "./actionType";
export function startUserProfileFetch() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}
export function userProfileFailure(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startUserProfileFetch());
    const url = APIurls.userProfile(userId);
    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          return dispatch(userProfileSuccess(data.data.user));
        } else {
          dispatch(userProfileFailure(data.message));
        }
      });
  };
}
