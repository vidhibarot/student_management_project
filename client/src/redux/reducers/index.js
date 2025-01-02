import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userreducer';

const reducer = combineReducers({
  user: userReducer,
});

export default reducer;
