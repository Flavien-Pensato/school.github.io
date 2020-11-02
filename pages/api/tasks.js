import db from '../../utils/db';
import Task from '../../modules/task/task.model';

export default async function handler(req, res) {
  await db();

  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error });
  }
}
