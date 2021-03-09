import { UPDATE_POSTS } from "./actionType";
import { APIurls } from "../helpers/url";
export function fetchPosts() {
  return (dispatch) => {
    const url = APIurls.fetchPosts();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("DATA", data);
        dispatch(updatePosts(data.data.posts));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
