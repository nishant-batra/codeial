import {
  UPDATE_POSTS,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_POSTS_LIKES,
} from "../actions/actionTypes";

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case ADD_POST:
      return [action.post, ...state];
    case ADD_COMMENT:
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }

        return post;
      });
      return newPosts;
    case UPDATE_POSTS_LIKES:
      const likePosts = state.map((post) => {
        if (post._id === action.Id) {
          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        }

        return post;
      });
      return likePosts;
    default:
      return state;
  }
}
