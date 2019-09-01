import XLSX from 'xlsx';
import _ from 'lodash';

import firebase from '../../config/firebase';

const studentsRef = '/students/';

export const importStudents = async (pathFile, classeId, schoolYear) => {
  try {
    const oFile = XLSX.read(pathFile, {
      type: 'binary',
    });

    const worksheet = oFile.Sheets[oFile.SheetNames[0]];
    const text = _.replace(XLSX.utils.sheet_to_csv(worksheet, { raw: true }), new RegExp(',|"', 'g'), ' ');

    await Promise.all(
      _.split(text, '\n').forEach(line => {
        const newStudentKey = firebase
          .database()
          .ref()
          .child(studentsRef)
          .push().key;

        firebase
          .database()
          .ref(studentsRef + newStudentKey)
          .set({ name: line.trim(), groupe: 0, classeId, schoolYear });
      }),
    );
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};
