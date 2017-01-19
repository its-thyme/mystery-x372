import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { createReduxStore } from './utils/reduxUtils';
import AppContainer from './containers/AppContainer';

console.log('need a hint? try typing help.');

const store = createReduxStore();

render (
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('main'));
