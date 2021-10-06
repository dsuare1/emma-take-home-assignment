import axios from 'axios';

export const getGistsForUser = (username) =>
  axios.get(`https://api.github.com/users/${username}/gists`);
