import React from "react";
import {
	Th,
	Tr,
	Tbody,
	Thead,
	TableContainer,
	TableCaption,
	Table,
	Box,
	Flex,
	Button,
	useMediaQuery,
} from "@chakra-ui/react";

import useSWR from "swr";
import fetch from "../../utils/fetch";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/prop-types
const Planning = function Planning2({ startAt }) {
	const d = new Date(startAt);

	const [isDisplayingInPrint] = useMediaQuery(["(display-mode: browser)"]);
	const { data: week, error, mutate } = useSWR(`/api/week/${d.toISOString()}`);

	const generateWeekTask = (event) => {
		event.preventDefault();

		if (!week?._doc?._id) {
			return;
		}

		fetch(`/api/week/generate/${week?._doc?._id}`, {
			method: "PUT",
		}).then((newWeek) => {
			mutate(newWeek);
		});
	};

	if (error) {
		return <Box>{error.toString()}</Box>;
	}

	if (!week || week.isHoliday) {
		return <Box>Semaine de vacances.</Box>;
	}

	if (!week.tasks) {
		return (
			<Flex justifyContent="center" alignItems="center">
				<Button onClick={generateWeekTask}>Generate</Button>
			</Flex>
		);
	}

	return (
		<TableContainer whiteSpace="pre-wrap">
			<Table variant="simple">
				<TableCaption>
					<Button onClick={generateWeekTask}>Generate</Button>
				</TableCaption>
				<Thead>
					<Tr>
						<Th color={isDisplayingInPrint ? "red" : ""}>Tâche</Th>
						<Th>Classe</Th>
						<Th>Groupe</Th>
						<Th>Étudiants</Th>
					</Tr>
				</Thead>
				<Tbody>
					{Object.keys(week.tasks).map((taskId) => {
						const task = week.tasks[taskId];

						return (
							<Tr key={taskId}>
								<Th>{taskId}</Th>
								<Th>{task.classe}</Th>
								<Th>{task.groupe}</Th>
								<Th>{task.students}</Th>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default Planning;
