import db from "../../utils/db";
import Student from "../../modules/students/student.model";

export default async function handler(req, res) {
  await db();
  const { method } = req;

  try {
    switch (method) {
      case "GET": {
        /* find all the data in our database */
        const pets = await Student.find({});
        res.status(200).json({ success: true, data: pets });
        break;
      }
      case "POST": {
        const { students } = JSON.parse(req.body);
        await Student.insertMany(students);
        res.status(201).json(...students);
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
