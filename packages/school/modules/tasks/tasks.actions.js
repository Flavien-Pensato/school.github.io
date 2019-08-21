import slug from 'slug';
import { database as firebase } from 'firebase';

const taskRef = '/tasks/';

export const FETCH_TASKS = 'tasks/FETCH_TASKS';
export const fetchTasksAction = () => (dispatch) => {
  try {
    const ref = firebase().ref(taskRef);

    const onValueChange = ref.on('value', (snapshot) => {
      dispatch({ type: FETCH_TASKS, tasks: snapshot.val() ? Object.values(snapshot.val()) : [] });
    });

    return () => ref.off('value', onValueChange);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);

    return Promise.resolve();
  }
};

export const ADD_TASK = 'tasks/ADD_TASK';
export const addTaskAction = task => async (dispatch) => {
  try {
    await firebase().ref(taskRef + slug(task._id)).set(task);
    await dispatch({ type: ADD_TASK });
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};


export const DELETE_TASK = 'tasks/DELETE_TASK';
export const removeTaskAction = taskId => async (dispatch) => {
  try {
    await firebase().ref(taskRef + taskId).remove();
    await dispatch({ type: DELETE_TASK });
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};
