import React from 'react';

import Importation from '../../modules/school/components/importation.connector';
import Classes from '../../modules/school/components/classes.connector';

export const Students = () => (
  <div className="pa3 pa5-ns">
    <Importation />
    <Classes />
  </div>
);
