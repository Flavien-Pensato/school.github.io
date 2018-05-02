import _ from 'lodash';

import { SHOW_TOASTER, HIDE_TOASTER } from './display.constants';

const initialeState = {};

export default function display(state = initialeState, action) {
  switch (action.type) {
    case SHOW_TOASTER:
      return { ...state, toaster: _.omit(action, 'type') };
    case HIDE_TOASTER:
      return _.omit(state, 'toaster');
    default:
      return state;
  }
}
