import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { importStudentsAction } from '../students.actions';

import { StudentsImport } from './studentsImport.component';

const mapDispatchToProps = dispatch => ({
  importFile: (pathFile, classeId) => dispatch(importStudentsAction(pathFile, classeId)),
});

export const ConnectedStudentsImport = withRouter(connect(undefined, mapDispatchToProps)(StudentsImport));
