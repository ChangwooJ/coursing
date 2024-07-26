import axios from 'axios';
import { FETCH_LISTS } from './type';

export const fetchLists = () => {
  return dispatch => {
    axios.get(`http://localhost:8000/api/my_list`)
      .then(response => {
        const lists = response.data;
        dispatch({
          type: FETCH_LISTS,
          payload: lists
        });
      })
  };
};