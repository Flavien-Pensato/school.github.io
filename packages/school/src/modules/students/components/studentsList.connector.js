import { connect } from 'react-redux';

import { StudentsList } from './studentsList.component';

import { getStudents } from '../students.selectors';
import { getSchoolYear } from '../../school/school.selectors';
import { fetchStudentsAction, removeStudentAction } from '../students.actions';

const mapStateToProps = state => ({
  students: getStudents(state),
  schoolYear: getSchoolYear(state),

});

const mapDispatchToProps = dispatch => ({
  fetchStudents: () => dispatch(fetchStudentsAction()),
  removeStudent: classeId => dispatch(removeStudentAction(classeId)),
});

export const ConnectedStudentList = connect(mapStateToProps, mapDispatchToProps)(StudentsList);
