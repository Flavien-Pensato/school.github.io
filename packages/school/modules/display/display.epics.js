import { combineEpics } from 'redux-observable';

import { SHOW_TOASTER } from './display.constants';
import { hideToaster } from './display.actions';

const hideToasterEpic = action$ =>
  action$
    .filter(action => action.type === SHOW_TOASTER)
    .delay(1000)
    .map(() => hideToaster());

export default combineEpics(hideToasterEpic);
