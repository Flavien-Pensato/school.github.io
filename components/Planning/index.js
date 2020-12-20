import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Flex, Button } from 'theme-ui';

import useSWR from 'swr';
import fetch from '../../utils/fetch';

const Planning = React.forwardRef(({ startAt }, ref) => {
  const d = new Date(startAt);
  const offsetDate = new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000);

  const { data: week, error, mutate } = useSWR(`/api/week/${offsetDate.toISOString()}`, fetch, {
    initialData: {},
  });

  const generateWeekTask = (event) => {
    event.preventDefault();

    fetch(`/api/week/generate/${week && week._id}`, {
      method: 'PUT',
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
        <Button ref={ref} onClick={generateWeekTask}>
          Generate
        </Button>
      </Flex>
    );
  }

  return (
    <>
      <Grid id="planning" gap="0px" columns="2fr 1fr 1fr 5fr">
        <Box>
          <strong>Tâche</strong>
        </Box>
        <Box>
          <strong>Classe</strong>
        </Box>
        <Box>
          <strong>Groupe</strong>
        </Box>
        <Box>
          <strong>Étudiants</strong>
        </Box>

        {Object.keys(week.tasks).map((taskId) => {
          const task = week.tasks[taskId];

          return (
            <Fragment key={taskId}>
              <Box>{taskId}</Box>
              <Box>{task.classe}</Box>
              <Box>{task.groupe}</Box>
              <Box>{task.students}</Box>
            </Fragment>
          );
        })}
      </Grid>
      <Flex justifyContent="center" alignItems="center" sx={{ visibility: 'hidden' }}>
        <Button ref={ref} onClick={generateWeekTask}>
          Generate
        </Button>
      </Flex>
    </>
  );
});

Planning.propTypes = {
  startAt: PropTypes.string.isRequired,
};

export default Planning;
