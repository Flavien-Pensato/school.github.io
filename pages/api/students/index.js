import db from '../../../utils/db';
import Student from '../../../modules/students/student.model';

export default async function handler(req, res) {
  const { method } = req;

  await db();

  switch (method) {
    case 'GET':
      try {
        /* find all the data in our database */
        const pets = await Student.find({});
        res.status(200).json({ success: true, data: pets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        /* create a new model in the database */
        const student = await Student.insertMany(JSON.parse(req.body).students);
        res.status(201).json({ success: true, data: student });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'PUT':
      try {
        const { studentId, studentGroupe } = JSON.parse(req.body);
        await Student.update(
          {
            _id: studentId,
          },
          {
            $set: {
              groupe: studentGroupe,
            },
          },
        );
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'DELETE':
      try {
        /* create a new model in the database */
        await Student.deleteOne({ _id: req.body });
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
