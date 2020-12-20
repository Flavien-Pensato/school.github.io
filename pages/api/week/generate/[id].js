import db from '../../../../utils/db';
import Week from '../../../../modules/week/week.model';
import Student from '../../../../modules/students/student.model';
import Task from '../../../../modules/task/task.model';

export const countTaskDoneByGroupe = (task, groupes, weeks) =>
  weeks.reduce(
    (acc, week) => {
      const { groupe } = week.tasks && week.tasks[task] ? week.tasks[task] : {};

      if (groupes.includes(Number(groupe))) {
        if (acc[groupe.toString()]) {
          acc[groupe.toString()] += 1;
        } else {
          acc[groupe.toString()] = 1;
        }
      }

      return acc;
    },
    groupes.reduce((acc, groupe) => {
      acc[groupe] = 0;

      return acc;
    }, {}),
  );

export const findGroupeHowWorkLess = (groupes) =>
  Object.keys(groupes).reduce(
    (acc, groupe) => ((groupes[acc] >= 0 ? groupes[acc] : Number.POSITIVE_INFINITY) > groupes[groupe] ? groupe : acc),
    '',
  );

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  try {
    await db();

    switch (method) {
      case 'PUT': {
        if (!id) {
          res.status(400).json({ error: 'Missing id' });
          break;
        }

        await Week.updateOne(
          {
            _id: id,
            isHolliday: false,
          },
          { $unset: { tasks: '' } },
        );
        const week = await Week.findOne({
          _id: id,
          isHolliday: false,
        });
        const weeksPast = await Week.find({
          startAt: {
            $lte: week.startAt,
          },
          isHolliday: false,
        });

        const tasks = await Task.find().distinct('name');
        const students = await Student.find({
          classe: { $in: week.classes },
          groupe: {
            $ne: [0, null],
          },
        });
        const classes = await Student.find({
          classe: { $in: week.classes },
          groupe: {
            $ne: [0, null],
          },
        }).distinct('classe');
        const groupes = await Student.find({
          classe: { $in: week.classes },
          groupe: {
            $ne: [0, null],
          },
        }).distinct('groupe');

        const groupesByClasse = await Promise.all(
          classes.map((classe) =>
            Student.find({
              classe: { $in: [classe] },
              groupe: {
                $ne: [0, null],
              },
            }).distinct('groupe'),
          ),
        );
        const groupesByClasse2 = classes.reduce((acc, classe, index) => {
          acc[classe] = groupesByClasse[index];

          return acc;
        }, {});

        const tasksOfWeek = [...classes, ...tasks].reduce(
          (acc, task) => {
            const groupesCounter = countTaskDoneByGroupe(
              task,
              groupesByClasse2[task]
                ? acc.groupes.filter((groupe) => groupesByClasse2[task].includes(groupe))
                : acc.groupes,
              weeksPast,
            );
            const groupe = findGroupeHowWorkLess(groupesCounter);
            const studentsOfGroupe =
              Number(groupe) > 0 ? students.filter((student) => student.groupe === Number(groupe)) : [];

            acc.groupes = acc.groupes.filter((item) => item !== Number(groupe));

            acc[task] = {
              groupe,
              classe: studentsOfGroupe[0] ? studentsOfGroupe[0].classe : 'aucune',
              students: studentsOfGroupe.map((student) => student.fullName).join(', '),
            };

            return acc;
          },
          {
            groupes,
          },
        );

        delete tasksOfWeek.groupes;

        const newWeek = await Week.findOneAndUpdate(
          {
            _id: week._id,
          },
          {
            $set: {
              tasks: tasksOfWeek,
            },
          },
          {
            new: true,
          },
        );

        res.status(200).json(newWeek);
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
