import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Flex, Button, Box } from 'rebass';
import useMedia from 'use-media';

import useSWR from 'swr';
import fetch from '../../utils/fetch';

// import { Div, P, Strong, Span, Table, Tbody, Thead, Th, Tr, Td } from '../../elements';

const PlanningWrapper = styled(Box)`
  display: flex;
  align-items: center;
  overflow-y: scroll;

  @media (max-width: 30em) {
    box-shadow: none;
  }
`;

const Para = styled(Box)`
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
  width: 100%;

  @media (max-width: 30em) {
    width: auto;
  }
`;

const Planning = ({ startAt }) => {
  const isWide = useMedia({ maxWidth: '30em' });
  const { data: week, error, mutate } = useSWR(`/api/week/${new Date(startAt)}`, fetch, {
    initialData: {},
  });

  const generateWeekTask = (event) => {
    event.preventDefault();

    fetch(`/api/week/generate/${week && week._id}`, {
      method: 'PUT',
    }).then((newWeek) => {
      // console.log(newWeek);
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

  if (isWide) {
    return (
      <PlanningWrapper id="planning" display="flex" flexDirection={['column', '']}>
        {Object.keys(week.tasks).map((taskId) => {
          const task = week.tasks[taskId];

          console.log(task);

          return (
            <Para key={taskId}>
              <Box display="flex" justifyContent="space-between">
                <span>
                  Tâche&nbsp;<Box>{task.task}</Box>
                </span>
                <span>
                  Groupe&nbsp;<Box>{task.groupe}</Box>&nbsp;en&nbsp;<Box>{task.classe}</Box>
                </span>
              </Box>

              <br />
              <i>{task.students}</i>
            </Para>
          );
        })}
      </PlanningWrapper>
    );
  }

  return (
    <PlanningWrapper id="planning">
      <Flex justifyContent="center" alignItems="center">
        <Button onClick={generateWeekTask}>Generate</Button>
      </Flex>

      <table>
        <thread>
          <tr>
            <th className="fw6 bb b--black-20 tl pb3 pr3">Tâche</th>
            <th className="fw6 bb b--black-20 tl pb3 pr3">Classe</th>
            <th className="fw6 bb b--black-20 tl pb3 pr3">Groupe</th>
            <th className="fw6 bb b--black-20 tl pb3 pr3">Étudiants</th>
          </tr>
        </thread>
        <tbody className="lh-copy">
          {Object.keys(week.tasks).map((taskId) => {
            const task = week.tasks[taskId];

            console.log(task);

            return (
              <tr key={taskId}>
                <td className="pv2 pr3 bb b--black-20">{taskId}</td>
                <td className="pv2 pr3 bb b--black-20">{task.classe}</td>
                <td className="pv2 pr3 bb b--black-20">{task.groupe}</td>
                <td className="pv2 pr3 bb b--black-20">{task.students}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </PlanningWrapper>
  );
};

Planning.propTypes = {
  startAt: PropTypes.string.isRequired,
};

export default Planning;
