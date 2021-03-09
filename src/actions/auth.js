import { APIurls } from "../helpers/url";
import { LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS } from "./actionType";
import { getFormBody } from "../helpers/Utils";
export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAIL,
    error: errorMessage,
  };
}
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}
export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIurls.login();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form/urlencoded",
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.success) {
          dispatch(loginSuccess(data.data.user));
          return;
        } else {
          dispatch(loginFailed(data.message));
          return;
        }
      });
  };
}
