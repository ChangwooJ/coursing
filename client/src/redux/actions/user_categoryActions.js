import axios from 'axios';
import { FETCH_UC } from './type';

export const fetchUC = (user_id) => {
  return dispatch => {
    axios.get(`http://localhost:8000/api/UC/${user_id}`)
      .then(response => {
        const UC = response.data;
        dispatch({
          type: FETCH_UC,
          payload: UC
        });
      })
  };
};