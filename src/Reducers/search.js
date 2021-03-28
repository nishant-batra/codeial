import { FETCH_SEARCH_RESULTS_SUCCESS } from "../actions/actionTypes";

const initialState = {
  results: [],
};
export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        results: action.users,
      };
    default:
      return state;
  }
}
