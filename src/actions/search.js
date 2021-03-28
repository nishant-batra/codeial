import { APIUrls } from "../helpers/urls";
import { FETCH_SEARCH_RESULTS_SUCCESS } from "./actionTypes";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";

export function searchResult(searchText) {
  return (dispatch) => {
    const url = APIUrls.search(searchText);
    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(searchResultSuccess(data.data.users));
        }
      });
  };
}

export function searchResultSuccess(users) {
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    users,
  };
}
