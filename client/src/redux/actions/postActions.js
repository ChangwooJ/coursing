import axios from 'axios';
import { FETCH_POSTS } from './type';

export const fetchPosts = () => {
  return dispatch => {
    axios.get(`http://localhost:8000/api/main`)
      .then(response => {
        const posts = response.data;
        dispatch({
          type: FETCH_POSTS,
          payload: posts
        });
      })
  };
};