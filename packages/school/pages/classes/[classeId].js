import React from 'react';
import Link from 'next/link';
import { Wrapper } from '@school/ui';

import { ConnectedStudentList } from '../../modules/students/components/studentsList.connector';
import { ConnectedStudentForm } from '../../modules/students/components/studentForm.connector';
import { ConnectedStudentsImport } from '../../modules/students/components/studentsImport.connector';

export default () => (
  <Wrapper>
    <Link href="/classes">
      <a>Retour</a>
    </Link>
    <ConnectedStudentList />
    <ConnectedStudentForm />
    <ConnectedStudentsImport />
  </Wrapper>
);
