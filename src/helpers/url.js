const API_Root = "http://codeial.codingninjas.com:8000/api/v2";

export const APIurls = {
  login: () => `${API_Root}/users/login`,
  signup: () => `${API_Root}/users/signup`,
  fetchPosts: (page = 1, limit = 5) => {
    return `${API_Root}/posts?page=${page}&limit=${limit}`;
  },
};
