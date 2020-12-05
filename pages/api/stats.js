import db from '../../utils/db';
import Week from '../../modules/week/week.model';

export default async function handler(req, res) {
  await db();

  try {
    /* find all the data in our database */
    const weeks = await Week.find({});

    const stats = weeks.reduce((acc, value) => {
      if (value.tasks) {
        Object.keys(value.tasks).forEach(taskName => {
          const task = value.tasks[taskName]
          const groupe = acc[task.groupe]

          if (!groupe) {
            acc[task.groupe] = {
              total: 1
            }
          }

          if (!acc[task.groupe][taskName]) {
            acc[task.groupe][taskName] = 1
            acc[task.groupe].total += 1
          } else {
            acc[task.groupe][taskName] += 1
            acc[task.groupe].total += 1
          }
        })
      }
      return acc
    }, {})
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
}
