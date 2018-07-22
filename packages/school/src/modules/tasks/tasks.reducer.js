import { FETCH_TASKS } from './tasks.actions';

const initialeState = {
  tasks: [],
};

export const tasks = (state = initialeState, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return { ...state, tasks: action.tasks };
    default:
      return state;
  }
};
