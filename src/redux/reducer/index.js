import {combineReducers} from 'redux';
import authReducer from './auth';
import checkListsReducer from './checkLists';

export const reducer = combineReducers({
  state: (state = {}) => state,
  authReducer,
  checkListsReducer,
});
