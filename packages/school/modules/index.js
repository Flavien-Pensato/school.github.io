import { combineReducers } from 'redux';

import account from './account';
import display from './display';
import school from './school';
import calendar from './calendar';
import { students } from './students/students.reducer';

export default combineReducers({
  account,
  display,
  school,
  calendar,
  students,
});
