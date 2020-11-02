export const groupeByClassesFromStudents = (students) =>
  students.reduce((acc, student) => {
    acc[student.classe] = acc[student.classe] || [];
    acc[student.classe].push(student);

    return acc;
  }, {});
