// import {store} from '../../store';
//
// export type State = ReturnType<typeof store.getState>;
//
// export type AppDispatch = typeof store.dispatch;

import { RootState, AppDispatch } from '../../store';

export type State = RootState['offers'];
export { AppDispatch };
