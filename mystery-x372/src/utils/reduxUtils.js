import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from '../redux';

export function createReduxStore() {
  const reducer = combineReducers({ ...reducers });

  const enhancer = compose(
    applyMiddleware(thunkMiddleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
      window.devToolsExtension() : f => f
  );

  return createStore(reducer, enhancer);
};
