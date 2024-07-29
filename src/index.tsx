import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {Setting} from './const';
import {OFFERS} from './mocks/offers';
import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        offersCount = {Setting.OffersCount}
        offers={OFFERS}
      />
    </Provider>
  </React.StrictMode>
);
