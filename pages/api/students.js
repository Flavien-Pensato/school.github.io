import db from '../../utils/db';
import Student from '../../modules/students/student.model';

export default async function handler(req, res) {
  await db();

  try {
    /* find all the data in our database */
    const pets = await Student.find({});
    res.status(200).json({ success: true, data: pets });
  } catch (error) {
    res.status(400).json({ error });
  }
}
