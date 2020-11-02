import React, { Fragment } from 'react';
import useSwr from 'swr';
import { Box, Button } from 'rebass';

import fetch from '../utils/fetch';

import TaskCard from '../components/TaskCard';

const Tasks = () => {
  const { data, loading, error } = useSwr(`/api/tasks`, fetch, {
    initialData: {
      data: [],
    },
  });

  if (loading) {
    return <span>Loading</span>;
  }
  if (error) {
    return <span>{JSON.stringify(error)}</span>;
  }

  return (
    <Fragment>
      <Box margin={['20px 0px', '15px 0px']}>
        <Button marginBottom={['10px', '0px']}>Créer ...</Button>
      </Box>
      {data.data.map((task) => (
        <TaskCard key={task._id} {...task} />
      ))}
    </Fragment>
  );
};

export default Tasks;
