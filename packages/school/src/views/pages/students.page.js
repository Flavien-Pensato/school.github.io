import React from 'react';

import { ConnectedStudentList } from '../../modules/students/components/studentsList.connector';

export const Students = () => (
  <div className="pa3 pa5-ns">
    <ConnectedStudentList />
  </div>
);
