import db from "../../../utils/db";
import Week from "../../../modules/week/week.model";
import Student from "../../../modules/students/student.model";

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	try {
		await db();

		switch (method) {
			case "GET": {
				const week = await Week.findOne({
					startAt: id.slice(0, -1).concat("+00:00"),
				});

				if (!week) {
					res.status(200).json({});
				} else {
					const students = await Student.find({
						classe: { $in: week.classes },
					});
					const tasks = Object.keys(week.tasks || []).reduce(
						(acc, taskName) => {
							const task = week.tasks[taskName];
							task.students = students
								.filter(
									(student) =>
										task.groupe?.toString() === student.groupe?.toString(),
								)
								.map((student) => student.fullName)
								.join(", ");

							acc[taskName] = task;

							return acc;
						},
						{},
					);

					res.status(200).json({ ...week, tasks });
				}

				break;
			}
			case "POST": {
				const week = await Week.insertMany(JSON.parse(req.body));
				res.status(201).json(...week);
				break;
			}
			case "PUT": {
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
			case "DELETE": {
				/* create a new model in the database */
				await Week.deleteOne({ _id: id });
				res.status(201).json();
				break;
			}
			default:
				res.setHeader("Allow", ["GET", "PUT", "POST", "DELETE"]);
				res.status(405).end(`Method ${method} Not Allowed`);
				break;
		}
	} catch (error) {
		res.status(400).json({ error: error.toString() });
	}
}
