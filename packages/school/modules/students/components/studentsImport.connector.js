import { connect } from 'react-redux';

import { importStudentsAction } from '../students.actions';

import { StudentsImport } from './studentsImport.component';

const mapDispatchToProps = dispatch => ({
  importFile: (pathFile, classeId) => dispatch(importStudentsAction(pathFile, classeId)),
});

export const ConnectedStudentsImport = connect(
  undefined,
  mapDispatchToProps,
)(StudentsImport);
