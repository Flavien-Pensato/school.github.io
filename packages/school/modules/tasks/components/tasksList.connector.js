import { connect } from 'react-redux';

import { TasksList } from './tasksList.component';

import { getTasks } from '../tasks.selectors';
import { fetchTasksAction, removeTaskAction } from '../tasks.actions';

const mapStateToProps = state => ({
  tasks: getTasks(state),
});

const mapDispatchToProps = dispatch => ({
  fetchTasks: () => dispatch(fetchTasksAction()),
  removeTask: taskId => dispatch(removeTaskAction(taskId)),
});

export const ConnectedTasksList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TasksList);
