import { FETCH_TITLES } from '../actions/type';

const initialState = {
  titles: []
};

const titleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TITLES:
      return {
        ...state,
        titles: action.payload
      };
    default:
      return state;
  }
};

export default titleReducer;
