import moment from 'moment';

import {
  SELECT_CLASSE,
  FETCH_TASKS,

  RESET_PREVIEW_CLASSE,
} from './school.constants';

const initialeState = {
  tasks: [],
  preview: null,
  schoolYear: moment().format('WY'),
};

export default function school(state = initialeState, action) {
  switch (action.type) {
    case SELECT_CLASSE:
      return { ...state, preview: action.preview };
    case FETCH_TASKS:
      return { ...state, tasks: action.tasks };
    case RESET_PREVIEW_CLASSE:
      return {
        ...state,
        preview: undefined,
      };
    default:
      return state;
  }
}
