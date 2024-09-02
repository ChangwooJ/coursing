import { FETCH_PC } from '../actions/type';

const initialState = {
    PC: []
};

const PCReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PC:
      return {
        ...state,
        PC: action.payload
      };
    default:
      return state;
  }
};

export default PCReducer;
