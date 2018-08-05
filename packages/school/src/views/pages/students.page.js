import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

export const Students = () => (
  <Wrapper>
    <Link to="/classes">Retour</Link>
    <ConnectedStudentList />
    <ConnectedStudentForm />
    <ConnectedStudentsImport />
  </Wrapper>
);
