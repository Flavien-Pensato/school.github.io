import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';

import epics from '../modules/epics';
import reducers from '../modules';

const logger = createLogger();
const middleware = [thunk, logger];

export const store = createStore(
  reducers,
  applyMiddleware(...middleware),
);
