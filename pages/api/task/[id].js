import db from '../../../utils/db';
import Task from '../../../modules/task/task.model';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await db();

  switch (method) {
    case 'GET':
      try {
        const task = await Task.find({ _id: id });
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const task = await Task.insertOne(req.body);

        res.status(201).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'PUT':
      try {
        await Task.update(
          {
            _id: id,
          },
          {
            $set: JSON.parse(req.body),
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
        await Task.deleteOne({ _id: id });
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
