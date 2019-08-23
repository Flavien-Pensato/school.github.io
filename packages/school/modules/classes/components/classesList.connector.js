import { connect } from 'react-redux';

import { ClassesList } from './classesList.component';

import { getClasses } from '../classes.selectors';
import { getSchoolYear } from '../../school/school.selectors';
import { fetchClassesAction, removeClasseAction } from '../classes.actions';

const mapStateToProps = state => ({
  classes: getClasses(state),
  schoolYear: getSchoolYear(state),
});

const mapDispatchToProps = dispatch => ({
  fetchClasses: () => dispatch(fetchClassesAction()),
  removeClasse: classeId => dispatch(removeClasseAction(classeId)),
});

export const ConnectedClassesList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClassesList);
