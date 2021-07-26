import db from "../../utils/db";
import Week from "../../modules/week/week.model";
import Student from "../../modules/students/student.model";

export default async function handler(req, res) {
  await db();

  try {
    const classes = await Student.distinct("classe");
    /* find all the data in our database */
    const weeks = await Week.find({
      startAt: {
        $gt: new Date("08/30/2021"),
      },
      endAt: {
        $lt: new Date("07/01/2022"),
      },
    });

    const stats = weeks.reduce((acc, value) => {
      if (value.tasks) {
        Object.keys(value.tasks).forEach((taskName) => {
          const task = value.tasks[taskName];
          const groupe = acc[task.groupe];

          if (!groupe) {
            acc[task.groupe] = {
              total: 0,
              classe: 0,
            };
          }

          if (classes.includes(taskName)) {
            if (!acc[task.groupe][taskName]) {
              acc[task.groupe][taskName] = 1;
              acc[task.groupe].classe += 1;
            } else {
              acc[task.groupe][taskName] += 1;
              acc[task.groupe].classe += 1;
            }
          } else if (!acc[task.groupe][taskName]) {
            acc[task.groupe][taskName] = 1;
          } else {
            acc[task.groupe][taskName] += 1;
          }
          acc[task.groupe].total += 1;
        });
      }

      return acc;
    }, {});
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(400).json({ error });
  }
}
