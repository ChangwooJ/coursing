import { FETCH_CONTENTS } from '../actions/type';

const initialState = {
  contents: []
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTENTS:
      return {
        ...state,
        contents: action.payload
      };
    default:
      return state;
  }
};

export default contentReducer;
