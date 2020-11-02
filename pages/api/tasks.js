import db from '../../utils/db';
import Task from '../../modules/task/task.model';

export default async function handler(req, res) {
  await db();

  try {
    const tasks = await Task.find({});
    res.status(201).json({ success: true, data: tasks });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
}
