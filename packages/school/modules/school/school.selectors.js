import _ from 'lodash';

export const getPreview = ({ school }) => _.get(school, 'preview');

export const getSchoolYear = ({ school }) => _.get(school, 'schoolYear');

export const getClasse = ({ school }, classeId) =>
  _.find(_.get(school, 'classes', []), classe => classe._id === classeId);
