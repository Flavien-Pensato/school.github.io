import db from '../../../../utils/db';
import Week from '../../../../modules/week/week.model';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  try {
    await db();

    switch (method) {
      case 'PUT': {
        const document = await Week.findOne({
          _id: id,
        });
        const week = await Week.findOneAndUpdate(
          {
            _id: id,
          },
          { $set: { isHolliday: !document.isHolliday } },
          {
            new: true,
          },
        );

        res.status(200).json(week);
        break;
      }
      default:
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
