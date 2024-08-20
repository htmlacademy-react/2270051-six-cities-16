import {combineReducers} from '@reduxjs/toolkit';
import offersReducer from './offers-slice';
import userReducer from './user-slice';
import offerReducer from './offer-slice';

const rootReducer = combineReducers({
  offers: offersReducer,
  user: userReducer,
  offer: offerReducer,
});

export default rootReducer;
