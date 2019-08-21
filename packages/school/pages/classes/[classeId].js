import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD:packages/school/src/views/pages/students.page.js
import { Wrapper } from '@school/ui';
=======
import styled from '@emotion/styled';
>>>>>>> d8b08e8... fixup! fixup! ci(): use workspace:packages/school/pages/classes/[classeId].js

import { ConnectedStudentList } from '../../modules/students/components/studentsList.connector';
import { ConnectedStudentForm } from '../../modules/students/components/studentForm.connector';
import { ConnectedStudentsImport } from '../../modules/students/components/studentsImport.connector';

const Wrapper = styled.div`
  max-width: 48rem;
  padding: 4rem;
  margin: 0 auto;
  
  @media (max-width: 700px) {
    padding: 1rem;
  }
`;

export default () => (
  <Wrapper>
    <Link to="/classes">Retour</Link>
    <ConnectedStudentList />
    <ConnectedStudentForm />
    <ConnectedStudentsImport />
  </Wrapper>
);
