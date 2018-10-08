import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from '@school/ui';

import { ConnectedStudentList } from '../../modules/students/components/studentsList.connector';
import { ConnectedStudentForm } from '../../modules/students/components/studentForm.connector';
import { ConnectedStudentsImport } from '../../modules/students/components/studentsImport.connector';

export const Students = () => (
  <Wrapper>
    <Link to="/classes">Retour</Link>
    <ConnectedStudentList />
    <ConnectedStudentForm />
    <ConnectedStudentsImport />
  </Wrapper>
);
