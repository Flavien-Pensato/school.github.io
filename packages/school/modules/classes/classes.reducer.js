import { FETCH_CLASSES } from './classes.actions';

const initialeState = {
  classes: [],
};

export const classes = (state = initialeState, action) => {
  switch (action.type) {
    case FETCH_CLASSES:
      return { ...state, classes: action.classes };
    default:
      return state;
  }
};
