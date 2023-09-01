import React, { Fragment } from 'react';
import useSWR from 'swr';
import { Grid, GridItem } from '@chakra-ui/react';
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
      <Grid id="planning" gap="0px" mt="20px" templateColumns={`repeat(${tasks.length + 3}, 1fr)`}>
        <GridItem sx={sx}>
          <strong>Groupe</strong>
        </GridItem>
        <GridItem sx={sx}>
          <strong>Total</strong>
        </GridItem>
        <GridItem sx={sx}>
          <strong>Classe</strong>
        </GridItem>
        {tasks.map((task) => (
          <GridItem sx={sx} key={task.name}>
            <strong title={task.name}>
              {task.name
                .split(' ')
                .map((name) => name.charAt(0).toUpperCase())
                .join('.')}
            </strong>
          </GridItem>
        ))}

        {Object.keys(stats.data).map((groupe) => {
          const taskStats = stats.data[groupe];

          return (
            <Fragment key={groupe}>
              <GridItem sx={sx}>{groupe}</GridItem>
              <GridItem sx={sx}>{taskStats.total}</GridItem>
              <GridItem sx={sx}>{taskStats.classe}</GridItem>
              {tasks.map((task) => (
                <GridItem sx={sx} key={task.name}>
                  <strong title={task.name}>{taskStats[task.name]}</strong>
                </GridItem>
              ))}
            </Fragment>
          );
        })}
      </Grid>
    </Layout>
  );
};

export default Statistiques;
