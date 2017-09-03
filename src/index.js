import React from 'react';
import { BrowserRouter, Router, Route, Link, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import reducers from './modules/index';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import createBrowserHistory from 'history/createBrowserHistory';
import moment from 'moment';
import epics from './modules/epics';

const history = createBrowserHistory();
const logger = createLogger();
const middleware = [thunkMiddleware, logger, createEpicMiddleware(epics)];

// Pages
import LayoutDefault from './views/layouts/index';
import Signin from './modules/account/components/signin.connector';
import Toaster from './modules/display/components/toaster.connector';
import Preview from './modules/school/components/preview.connector';
import Students from './views/pages/Students';
import Calendar from './views/pages/Calendar';

moment.locale('fr');

let store = createStore(
  reducers,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
  applyMiddleware(...middleware)
);

const Main = () =>
  <main>
    <Toaster />
    <Route path="/" component={LayoutDefault} />
    <Route path="/login" component={Signin} />
    <Route path="/eleves/:id?" component={Students} />
    <Route path="/preview" component={Preview} />
    <Route path="/calendrier" component={Calendar} />
  </main>;

const App = () =>
  <Provider store={store}>
    <Main />
  </Provider>;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
