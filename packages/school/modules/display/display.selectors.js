import _ from 'lodash';

export const getToaster = ({ display }) => _.get(display, 'toaster', {});
