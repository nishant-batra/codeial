const API_Root = "http://codeial.codingninjas.com:8000/api/v2";

export const APIurls = {
  login: () => `${API_Root}/users/login`,
  signup: () => `${API_Root}/users/signup`,
  editProfile: () => `${API_Root}/users/edit`,
  userProfile: (userId) => `${API_Root}/users/${userId}`,
  fetchPosts: (page = 1, limit = 25) => {
    return `${API_Root}/posts?page=${page}&limit=${limit}`;
  },
  userFriends: () => `${API_Root}/friendship/fetch_user_friends`,
  addFriend: (userID) =>
    `${API_Root}/friendship/create_friendship?user_id=${userID}`,
  removeFriend: (userID) =>
    `${API_Root}/friendship/remove_friendship?user_id=${userID}`,
};
