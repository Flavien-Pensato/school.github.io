import React from 'react';

import { ConnectedClassesList } from '../../modules/classes/components/classesList.connector';
import { ConnectedClassesForm } from '../../modules/classes/components/classeForm.connector';

export const Students = () => (
  <div className="pa3 pa5-ns">
    <ConnectedClassesList />
    <ConnectedClassesForm />
  </div>
);
