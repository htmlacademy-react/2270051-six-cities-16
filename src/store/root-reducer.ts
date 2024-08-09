import {combineReducers} from '@reduxjs/toolkit';
import offersReducer from './offers-slice';
import userReducer from './user-slice';

const rootReducer = combineReducers({
  offers: offersReducer,
  user: userReducer,
});

export default rootReducer;
