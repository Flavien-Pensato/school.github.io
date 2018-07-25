import { connect } from 'react-redux';

import { getSchoolYear } from '../../school/school.selectors';
import { ClasseForm } from './classeForm.component';

import { addClasseAction } from '../classes.actions';

const mapStateToProps = state => ({
  schoolYear: getSchoolYear(state),
});

const mapDispatchToProps = dispatch => ({
  addClasse: classe => dispatch(addClasseAction(classe)),
});

export const ConnectedClassesForm = connect(mapStateToProps, mapDispatchToProps)(ClasseForm);
