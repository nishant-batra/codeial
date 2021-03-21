import { combineReducers } from "redux";
import posts from "./Posts";
import auth from "./auth";
import profile from "./profile";

export default combineReducers({
  posts,
  auth,
  profile,
});
