import _ from 'lodash';

export const getClasses = ({ classes }) => _.get(classes, 'classes', []);
