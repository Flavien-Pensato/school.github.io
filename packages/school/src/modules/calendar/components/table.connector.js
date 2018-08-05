import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Table from './table.component';

import { fetchClassesAction } from '../../classes/classes.actions';
import { getClasses } from '../../classes/classes.selectors';

const mapStateToProps = state => ({
  classes: getClasses(state),
});

const mapDispatchToProps = dispatch => ({
  fetchClasses: () => dispatch(fetchClassesAction()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Table));
