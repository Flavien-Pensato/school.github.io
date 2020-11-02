import db from '../../../utils/db';
import Student from '../../../modules/students/student.model';

export default async function handler(req, res) {
  const { method } = req;

  await db();

  switch (method) {
    case 'GET':
      try {
        /* find all the data in our database */
        const classes = await Student.distinct('classe');
        res.status(200).json({ success: true, data: classes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
