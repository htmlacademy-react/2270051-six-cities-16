import {combineReducers} from '@reduxjs/toolkit';
import offersReducer from './offers-slice/offers-slice';
import userReducer from './user-slice/user-slice';
import offerReducer from './offer-slice/offer-slice';

const rootReducer = combineReducers({
  offers: offersReducer,
  user: userReducer,
  offer: offerReducer,
});

export default rootReducer;
