import React, { Fragment } from 'react';
import useSWR from 'swr';
import { Grid, Box } from '@chakra-ui/react';
import Layout from '../components/Layout';

const sx = {
  borderTop: '1px solid',
  borderBottom: '1px solid',
  borderRight: '1px solid',
  borderLeft: '1px solid',
  textAlign: 'center',
};

const Statistiques = () => {
  const { data: stats = { data: [] } } = useSWR('/api/stats');
  const { data: tasks = [] } = useSWR('/api/tasks');

  return (
    <Layout>
      <Grid
        id="planning"
        gap="0px"
        mt="20px"
        columns={`1fr 1fr 1fr ${new Array(tasks.length)
          .map(() => '1fr')
          .join(' ')}`}
      >
        <Box sx={sx}>
          <strong>Groupe</strong>
        </Box>
        <Box sx={sx}>
          <strong>Total</strong>
        </Box>
        <Box sx={sx}>
          <strong>Classe</strong>
        </Box>
        {tasks.map((task) => (
          <Box sx={sx}>
            <strong title={task.name}>
              {task.name
                .split(' ')
                .map((name) => name.charAt(0).toUpperCase())
                .join('.')}
            </strong>
          </Box>
        ))}

        {Object.keys(stats.data).map((groupe) => {
          const taskStats = stats.data[groupe];

          return (
            <Fragment key={groupe}>
              <Box sx={sx}>{groupe}</Box>
              <Box sx={sx}>{taskStats.total}</Box>
              <Box sx={sx}>{taskStats.classe}</Box>
              {tasks.map((task) => (
                <Box sx={sx}>
                  <strong title={task.name}>{taskStats[task.name]}</strong>
                </Box>
              ))}
            </Fragment>
          );
        })}
      </Grid>
    </Layout>
  );
};

export default Statistiques;
