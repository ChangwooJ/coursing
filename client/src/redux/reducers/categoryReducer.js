import { FETCH_CATEGORIES } from '../actions/type';

const initialState = {
    categories: []
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    default:
      return state;
  }
};

export default categoryReducer;
