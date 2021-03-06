import db from '../../../utils/db';
import Week from '../../../modules/week/week.model';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  try {
    await db();

    switch (method) {
      case 'GET': {
        const week = await Week.findOne({ startAt: id.slice(0, -1).concat('+00:00') });

        res.status(200).json(week || {});
        break;
      }
      case 'POST': {
        const week = await Week.insertMany(JSON.parse(req.body));
        res.status(201).json(...week);
        break;
      }
      case 'PUT': {
        await Week.updateOne(
          {
            _id: id,
          },
          {
            $set: JSON.parse(req.body),
          },
        );
        res.status(204);
        break;
      }
      case 'DELETE': {
        /* create a new model in the database */
        await Week.deleteOne({ _id: id });
        res.status(201).json();
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
