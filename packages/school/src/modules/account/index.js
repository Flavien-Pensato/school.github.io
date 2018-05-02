import _ from 'lodash';

import { SIGNIN, SIGNOUT, AUTO_LOGIN_DONE } from './account.constants';

const initialeState = {
  autoLoginDone: false,
};

export default function account(state = initialeState, action) {
  switch (action.type) {
    case SIGNIN:
      return { ...state, ..._.omit(action, 'type') };
    case SIGNOUT:
      return _.omit(state, 'user');
    case AUTO_LOGIN_DONE:
      return { ...state, autoLoginDone: true };
    default:
      return state;
  }
}
