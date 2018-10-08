import React from 'react';
import { Wrapper } from '@school/ui';

import { ConnectedTasksList } from '../../modules/tasks/components/tasksList.connector';
import { ConnectedTaskForm } from '../../modules/tasks/components/taskForm.connector';

export const Tasks = () => (
  <Wrapper>
    <ConnectedTasksList />
    <ConnectedTaskForm />
  </Wrapper>
);
