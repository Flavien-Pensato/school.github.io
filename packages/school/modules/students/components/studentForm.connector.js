import { connect } from 'react-redux';

import { StudentForm } from './studentForm.component';

import { addStudentAction } from '../students.actions';

const mapDispatchToProps = dispatch => ({
  addStudent: student => dispatch(addStudentAction(student)),
});

export const ConnectedStudentForm = connect(
  undefined,
  mapDispatchToProps,
)(StudentForm);
