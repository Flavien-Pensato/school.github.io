import { combineReducers } from 'redux';

import account from './account';
import school from './school';

export default combineReducers({
  account,
  school,
});
