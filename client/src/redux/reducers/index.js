import { combineReducers } from 'redux';
import postReducer from './postReducer';
import contentReducer from './contentReducer';
import listReducer from './listReducer';

const rootReducer = combineReducers({
  posts: postReducer,
  contents: contentReducer,
  lists: listReducer,
});

export default rootReducer;
