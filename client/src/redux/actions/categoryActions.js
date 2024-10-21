import axios from 'axios';
import { FETCH_CATEGORIES } from './type';

export const fetchCategory = () => {
  return dispatch => {
    axios.get(`http://localhost:8000/api/category`)
      .then(response => {
        const categories = response.data;
        dispatch({
          type: FETCH_CATEGORIES,
          payload: categories
        });
      })
  };
};