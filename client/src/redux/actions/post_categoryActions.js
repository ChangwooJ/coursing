import axios from 'axios';
import { FETCH_PC } from './type';

export const fetchPC = () => {
  return dispatch => {
    axios.get(`http://localhost:8000/api/PC`)
      .then(response => {
        const PC = response.data;
        dispatch({
          type: FETCH_PC,
          payload: PC
        });
      })
  };
};