import db from '../../../utils/db';
import Task from '../../../modules/task/task.model';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  try {
    await db();

    switch (method) {
      case 'GET': {
        const task = await Task.find({ _id: id });
        res.status(200).json(task);
        break;
      }
      case 'POST': {
        const task = await Task.insertMany(JSON.parse(req.body));

        res.status(201).json(...task);
        break;
      }
      case 'PUT': {
        await Task.updateOne(
          {
            _id: id,
          },
          {
            $set: JSON.parse(req.body),
          },
        );
        res.status(200).json();
        break;
      }
      case 'DELETE': {
        await Task.deleteOne({ _id: id });

        res.status(200).json();
        break;
      }
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
