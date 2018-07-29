import { FETCH_STUDENTS } from './students.actions';

const initialeState = {
  students: [],
};

export const students = (state = initialeState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS:
      return { ...state, students: action.students };
    default:
      return state;
  }
};
