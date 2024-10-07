import { combineReducers } from 'redux';
import postReducer from './postReducer';
import contentReducer from './contentReducer';
import listReducer from './listReducer';
import titleReducer from './titleReducer';
import UCReducer from './UCReducer';
import PCReducer from './PCReducer';
import userReducer from './userReducer';
import userContentReducer from './userContentReducer';

const rootReducer = combineReducers({
  posts: postReducer,
  contents: contentReducer,
  lists: listReducer,
  titles: titleReducer,
  users: userReducer,
  UC: UCReducer,
  PC: PCReducer,
  user_contents: userContentReducer,
});

export default rootReducer;
