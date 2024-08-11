import {configureStore} from '@reduxjs/toolkit';
import {NavigateFunction} from 'react-router-dom';
import rootReducer from './root-reducer';
import {createAPI} from '../services/api';

export const api = createAPI((() => {}) as NavigateFunction);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
