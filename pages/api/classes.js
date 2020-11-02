import db from '../../utils/db';
import Student from '../../modules/students/student.model';

export default async function handler(req, res) {
  const { method } = req;

  try {
    await db();

    switch (method) {
      case 'GET': {
        /* find all the data in our database */
        const classes = await Student.distinct('classe');
        res.status(200).json(classes);
        break;
      }
      default:
        res.status(400).json({ success: false });
        break;
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
