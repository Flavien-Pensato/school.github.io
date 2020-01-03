import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import useMedia from 'use-media';

import { Div, P, Strong, Span, Table, Tbody, Thead, Th, Tr, Td } from '../../elements';

const PlanningWrapper = styled(Div)`
  display: flex;
  align-items: center;
  overflow-y: scroll;

  @media (max-width: 30em) {
    box-shadow: none;
  }
`;

const Para = styled(P)`
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
  width: 100%;

  @media (max-width: 30em) {
    width: auto;
  }
`;

const Planning = ({ week, generate }) => {
  const [loading, setLoading] = useState(false);
  const isWide = useMedia({ maxWidth: '30em' });
  const handleClick = useCallback(
    event => {
      event.preventDefault();

      setLoading(true);
      generate(week).then(() => setLoading(false));
    },
    [week],
  );

  if (loading) {
    return <span>Loading</span>;
  }

  if (week.disable) {
    return <span>Semaine de vacances.</span>;
  }

  if (!week.tasks) {
    return (
      <Div
        id="planning"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="20rem"
        textAlign="center"
        overflowY="scroll"
      >
        <P>Aucun planning de prévu cette semaine !</P>
      </Div>
    );
  }

  if (isWide) {
    return (
      <PlanningWrapper id="planning" display="flex" flexDirection={['column', '']}>
        {Object.keys(week.tasks).map(taskId => {
          const task = week.tasks[taskId];

          return (
            <Para>
              <Span display="flex" justifyContent="space-between">
                <span>
                  Tâche&nbsp;<Strong>{task.task}</Strong>
                </span>
                <span>
                  Groupe&nbsp;<Strong>{task.groupe}</Strong>&nbsp;en&nbsp;<Strong>{task.classe}</Strong>
                </span>
              </Span>

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
      <Table>
        <Thead>
          <Tr>
            <Th className="fw6 bb b--black-20 tl pb3 pr3">Tâche</Th>
            <Th className="fw6 bb b--black-20 tl pb3 pr3">Classe</Th>
            <Th className="fw6 bb b--black-20 tl pb3 pr3">Groupe</Th>
            <Th className="fw6 bb b--black-20 tl pb3 pr3">Étudiants</Th>
          </Tr>
        </Thead>
        <Tbody className="lh-copy">
          {Object.keys(week.tasks).map(taskId => {
            const task = week.tasks[taskId];

            return (
              <Tr key={task.task}>
                <Td className="pv2 pr3 bb b--black-20">{task.task}</Td>
                <Td className="pv2 pr3 bb b--black-20">{task.classe}</Td>
                <Td className="pv2 pr3 bb b--black-20">{task.groupe}</Td>
                <Td className="pv2 pr3 bb b--black-20">{task.students}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </PlanningWrapper>
  );
};

Planning.propTypes = {
  week: PropTypes.shape({
    tasks: PropTypes.shape(),
    disable: PropTypes.bool,
  }).isRequired,
  generate: PropTypes.func.isRequired,
};

export default Planning;
