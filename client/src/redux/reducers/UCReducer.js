import { FETCH_UC } from '../actions/type';

const initialState = {
    UC: []
};

const UCReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UC:
      return {
        ...state,
        UC: action.payload
      };
    default:
      return state;
  }
};

export default UCReducer;
