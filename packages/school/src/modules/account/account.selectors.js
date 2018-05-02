import _ from 'lodash';

export const getUid = ({ account }) => _.get(account, 'user.uid', undefined);

export const getAutoLoginDone = ({ account }) => _.get(account, 'autoLoginDone', false);
