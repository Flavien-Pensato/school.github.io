import {
  SELECT_CLASSE,
  FETCH_CLASSES,
  FETCH_TASKS,

  RESET_PREVIEW_CLASSE,
} from './school.constants';

const initialeState = {
  classes: [],
  tasks: [],
  preview: null,
};

export default function school(state = initialeState, action) {
  switch (action.type) {
    case SELECT_CLASSE:
      return { ...state, preview: action.preview };
    case FETCH_CLASSES:
      return { ...state, classes: action.classes };
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
