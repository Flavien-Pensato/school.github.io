import React from 'react';
import { Link } from 'react-router-dom';

import { ConnectedStudentList } from '../../modules/students/components/studentsList.connector';
import { ConnectedStudentForm } from '../../modules/students/components/studentForm.connector';
import { ConnectedStudentsImport } from '../../modules/students/components/studentsImport.connector';

export const Students = () => (
  <div className="pa3 pa5-ns">
    <Link to="/classes">Retour</Link>
    <ConnectedStudentList />
    <ConnectedStudentForm />
    <ConnectedStudentsImport />
  </div>
);
