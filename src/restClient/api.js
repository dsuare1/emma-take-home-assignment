import axios from 'axios';

export const getPublicGists = () =>
  axios.get('https://api.github.com/gists/public');

export const getGistsForUser = (username) =>
  axios.get(`https://api.github.com/users/${username}/gists`);
