import { combineReducers } from 'redux';

import account from './account';
import display from './display';
import school from './school';
import calendar from './calendar';
import { tasks } from './tasks/tasks.reducer';

export default combineReducers({
  account,
  display,
  school,
  calendar,
  tasks,
});
