import { connect } from 'react-redux';

import { StudentsList } from './studentsList.component';

import { getStudents } from '../students.selectors';
import { getSchoolYear } from '../../school/school.selectors';
import { fetchStudentsAction, removeStudentAction, changeStudentAction } from '../students.actions';

const mapStateToProps = state => ({
  students: getStudents(state),
  schoolYear: getSchoolYear(state),

});

const mapDispatchToProps = dispatch => ({
  fetchStudents: classeId => dispatch(fetchStudentsAction(classeId)),
  removeStudent: classeId => dispatch(removeStudentAction(classeId)),
  changeStudent: student => dispatch(changeStudentAction(student)),
});

export const ConnectedStudentList = connect(mapStateToProps, mapDispatchToProps)(StudentsList);
