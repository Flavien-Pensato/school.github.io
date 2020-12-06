import React, { Fragment } from 'react'
import useSWR from 'swr'
import { Grid, Box } from 'theme-ui';
import Layout from '../components/Layout'

const sx = {
  borderTop: '2px dashed',
  borderBottom: '2px dashed',
  borderRight: '1px solid',
  borderLeft: '1px solid',
  textAlign: 'center'
}

const Statistiques = () => {
  const { data: stats, mutate } = useSWR('/api/stats', {
    initialData: {
      data: {}
    },
  });
  const { data: tasks } = useSWR('/api/tasks', {
    initialData: [],
  });

  return (
    <Layout>
      <Grid id="planning" gap="0px" mt="20px" columns={`1fr 1fr 1fr ${Object.keys(tasks).map(() => '1fr').join(' ')}`}>
        <Box sx={sx}>
          <strong>Groupe</strong>
        </Box>
        <Box sx={sx}>
          <strong>Total</strong>
        </Box>
        <Box sx={sx}>
          <strong>Classe</strong>
        </Box>
        {tasks.map(task => (
          <Box sx={sx}>
            <strong title={task.name}>{task.name.split(" ").map((name)=>name.charAt(0).toUpperCase()).join(".")}</strong>
          </Box>
        ))}

        {Object.keys(stats.data).map((groupe) => {
          const taskStats = stats.data[groupe]

          console.log(taskStats)
          return (
            <Fragment key={groupe}>
              <Box sx={sx}>{groupe}</Box>
              <Box sx={sx}>{taskStats.total}</Box>
              <Box sx={sx}>{taskStats.classe}</Box>
              {tasks.map(task => (
                <Box sx={sx}>
                  <strong title={task.name}>{taskStats[task.name]}</strong>
                </Box>
              ))}
            </Fragment>
          );
        })}
      </Grid>
    </Layout>
  )
}

export default Statistiques
