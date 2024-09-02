import { combineReducers } from 'redux';
import postReducer from './postReducer';
import contentReducer from './contentReducer';
import listReducer from './listReducer';
import titleReducer from './titleReducer';
import UCReducer from './UCReducer';
import PCReducer from './PCReducer';

const rootReducer = combineReducers({
  posts: postReducer,
  contents: contentReducer,
  lists: listReducer,
  titles: titleReducer,
  UC: UCReducer,
  PC: PCReducer,
});

export default rootReducer;
