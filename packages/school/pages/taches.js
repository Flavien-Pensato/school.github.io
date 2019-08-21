import React from 'react';
import styled from '@emotion/styled';

import { ConnectedTasksList } from '../modules/tasks/components/tasksList.connector';
import { ConnectedTaskForm } from '../modules/tasks/components/taskForm.connector';

const TasksWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 24rem;
`;

export default () => (
  <TasksWrapper>
    <ConnectedTasksList />
    <ConnectedTaskForm />
  </TasksWrapper>
);
