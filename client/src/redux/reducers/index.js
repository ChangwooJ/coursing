import { combineReducers } from 'redux';
import postReducer from './postReducer';
import contentReducer from './contentReducer';

const rootReducer = combineReducers({
  posts: postReducer,
  contents: contentReducer,
});

export default rootReducer;
