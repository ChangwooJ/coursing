import axios from 'axios';
import { FETCH_POSTS } from './type';
import { FETCH_CONTENTS } from './type';

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

export const fetchContents = () => {
  return dispatch => {
    axios.get(`http://localhost:8000/api/main_content`)
      .then(response => {
        const contents = response.data;
        dispatch({
          type: FETCH_CONTENTS,
          payload: contents
        });
      })
  };
};