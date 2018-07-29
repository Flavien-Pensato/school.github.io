import _ from 'lodash';

export const getStudents = ({ students }) =>
  _.orderBy(_.get(students, 'students'), [student => student.name.toLowerCase()], ['asyn']);
