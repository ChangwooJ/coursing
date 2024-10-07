import axios from 'axios';
import { FETCH_USER_CONTENTS } from './type';

export const fetchUserContents = () => {
    return dispatch => {
      axios.get(`http://localhost:8000/api/user_content`)
        .then(response => {
          const user_contents = response.data;
          dispatch({
            type: FETCH_USER_CONTENTS,
            payload: user_contents
          });
        })
    };
  };