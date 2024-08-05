import {configureStore} from '@reduxjs/toolkit';
import offersReducer from './reducer';

const store = configureStore({
  reducer: {
    offers: offersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
