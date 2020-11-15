import db from '../../utils/db';
import Week from '../../modules/week/week.model';

export default async function handler(req, res) {
  await db();

  try {
    const weeks = await Week.find({});
    res.status(200).json(weeks);
  } catch (error) {
    res.status(400).json({ error });
  }
}
