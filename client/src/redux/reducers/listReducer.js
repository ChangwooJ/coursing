import { FETCH_LISTS } from '../actions/type';

const initialState = {
  lists: []
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LISTS:
      return {
        ...state,
        lists: action.payload
      };
    default:
      return state;
  }
};

export default listReducer;
