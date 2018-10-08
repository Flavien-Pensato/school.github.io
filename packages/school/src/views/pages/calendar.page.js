import React from 'react';

import { Wrapper } from '@school/ui';

import { ConnectedPresenceTable } from '../../modules/calendar/components/presenceTable/presenceTable.connector';

export const Calendar = () => (
  <Wrapper>
    <ConnectedPresenceTable />
  </Wrapper>
);
