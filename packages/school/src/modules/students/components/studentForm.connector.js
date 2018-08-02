import { connect } from 'react-redux';
import { withRouter } from 'react-router';


import { StudentForm } from './studentForm.component';

import { addStudentAction } from '../students.actions';

const mapDispatchToProps = dispatch => ({
  addStudent: student => dispatch(addStudentAction(student)),
});

export const ConnectedStudentForm = withRouter(connect(undefined, mapDispatchToProps)(StudentForm));
