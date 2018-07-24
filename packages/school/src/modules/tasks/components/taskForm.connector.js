import { connect } from 'react-redux';

import { TaskForm } from './taskForm.component';

import { addTaskAction } from '../tasks.actions';

const mapDispatchToProps = dispatch => ({
  addTask: task => dispatch(addTaskAction(task)),
});

export const ConnectedTaskForm = connect(undefined, mapDispatchToProps)(TaskForm);
