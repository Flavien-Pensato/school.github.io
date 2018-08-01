// import slug from 'slug';
import { database as firebase } from 'firebase';

const studentsRef = '/students/';

export const FETCH_STUDENTS = 'tasks/FETCH_STUDENTS';
export const fetchStudentsAction = () => (dispatch) => {
  try {
    const ref = firebase().ref(studentsRef);

    const onValueChange = ref.on('value', (snapshot) => {
      dispatch({ type: FETCH_STUDENTS, students: snapshot.val() ? Object.values(snapshot.val()) : [] });
    });

    return () => ref.off('value', onValueChange);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);

    return Promise.resolve();
  }
};
