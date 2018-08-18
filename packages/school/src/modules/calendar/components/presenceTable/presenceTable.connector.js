import { connect } from 'react-redux';

import { PresenceTable } from './presenceTable.component';

import { fetchClassesAction } from '../../../classes/classes.actions';
import { addDateAction, editDateAction, fetchDatesAction } from '../../calendar.actions';
import { getClasses } from '../../../classes/classes.selectors';
import { getDates } from '../../calendar.selectors';

const mapStateToProps = state => ({
  classes: getClasses(state),
  dates: getDates(state),
});

const mapDispatchToProps = dispatch => ({
  addDate: date => dispatch(addDateAction(date)),
  editDate: date => dispatch(editDateAction(date)),
  fetchClasses: () => dispatch(fetchClassesAction()),
  fetchDates: () => dispatch(fetchDatesAction()),
});

export const ConnectedPresenceTable = connect(mapStateToProps, mapDispatchToProps)(PresenceTable);
