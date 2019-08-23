import React from 'react';
import { Wrapper } from '@school/ui';

import { ConnectedClassesList } from '../../modules/classes/components/classesList.connector';
import { ConnectedClassesForm } from '../../modules/classes/components/classeForm.connector';

export default () => (
  <Wrapper>
    <ConnectedClassesList />
    <ConnectedClassesForm />
  </Wrapper>
);
