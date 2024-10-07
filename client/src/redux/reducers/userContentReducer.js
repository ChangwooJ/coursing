import { FETCH_USER_CONTENTS } from '../actions/type';

const initialState = {
    user_contents: []
};

const userContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_CONTENTS:
      return {
        ...state,
        user_contents: action.payload
      };
    default:
      return state;
  }
};

export default userContentReducer;
