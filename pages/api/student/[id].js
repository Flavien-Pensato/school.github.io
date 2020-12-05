import db from '../../../utils/db';
import Student from '../../../modules/students/student.model';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  try {
    await db();

    switch (method) {
      case 'GET': {
        const student = await Student.find({ _id: id });
        res.status(200).json(student);
        break;
      }
      case 'POST': {
        const student = await Student.insertMany(JSON.parse(req.body));
        res.status(201).json(...student);
        break;
      }
      case 'PUT': {
        const student = await Student.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $set: JSON.parse(req.body),
          },
          { new: true },
        );
        res.status(200).json(student);
        break;
      }
      case 'DELETE': {
        await Student.deleteOne({ _id: id });
        res.status(200).json();
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
