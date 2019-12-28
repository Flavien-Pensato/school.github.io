import React, { useState, useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Div, P, I, Button, Td, Th, Tr } from '../../elements';

const PlanningWrapper = styled(Div)`
  display: flex;
`;

const Planning = ({ week, generate }) => {
  const [loading, setLoading] = useState(false);
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
      <Div id="planning" display="flex" justifyContent="center" alignItems="center" height="20rem" textAlign="center">
        <P>
          Aucun planning de prévu cette semaine !
          <br />
          <br />
          <Button
            onClick={handleClick}
            border="none"
            borderRadius="50%"
            width="50px"
            color="primary"
            backgroundColor="secondary"
            height={50}
            style={{ cursor: 'pointer' }}
          >
            <I className="fas fa-recycle" fontSize={30} />
          </Button>
        </P>
      </Div>
    );
  }

  return (
    <PlanningWrapper id="planning">
      <table className="f7 w-100 center" cellSpacing="0">
        <thead>
          <Tr>
            <Th className="fw6 bb b--black-20 tl pb3 pr3">Tâche</Th>
            <Th className="fw6 bb b--black-20 tl pb3 pr3">Classe</Th>
            <Th className="fw6 bb b--black-20 tl pb3 pr3">Groupe</Th>
            <Th className="fw6 bb b--black-20 tl pb3 pr3">Étudiants</Th>
          </Tr>
        </thead>
        <tbody className="lh-copy">
          {Object.keys(week.tasks).map(taskId => {
            const task = week.tasks[taskId];

            return (
              <Fragment>
                <Tr key={task.task}>
                  <Td className="pv2 pr3 bb b--black-20">{task.task}</Td>
                  <Td className="pv2 pr3 bb b--black-20">{task.classe}</Td>
                  <Td className="pv2 pr3 bb b--black-20">{task.groupe}</Td>
                  <Td className="pv2 pr3 bb b--black-20">{task.students}</Td>
                </Tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
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
