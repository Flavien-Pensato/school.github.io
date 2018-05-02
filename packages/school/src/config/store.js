import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux';

import epics from '../modules/epics';
import reducers from '../modules';

const logger = createLogger();
const middleware = [thunkMiddleware, logger, createEpicMiddleware(epics)];

export const store = createStore(
  reducers,
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
  applyMiddleware(...middleware),
);
