import React from 'react';

import { ConnectedStudentList } from '../../modules/students/components/studentsList.connector';
import { ConnectedStudentForm } from '../../modules/students/components/studentForm.connector';

export const Students = () => (
  <div className="pa3 pa5-ns">
    <ConnectedStudentList />
    <ConnectedStudentForm />
  </div>
);
