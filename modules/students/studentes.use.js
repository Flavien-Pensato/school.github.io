import XLSX from 'xlsx';

// studentsReference, classeId
export const importStudents = () => async pathFile => {
  try {
    // const oFile = XLSX.read(pathFile, {
    XLSX.read(pathFile, {
      type: 'binary',
    });

    // const worksheet = oFile.Sheets[oFile.SheetNames[0]];
    // const text = _.replace(XLSX.utils.sheet_to_csv(worksheet, { raw: true }), new RegExp(',|"', 'g'), ' ');

    // const addStudentImported = addStudent(studentsReference, classeId);

    // await Promise.all(
    //   _.split(text, '\n').forEach(line => {
    //     // addStudentImported({ name: line.trim() });
    //   }),
    // );
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};
