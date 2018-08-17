import React from 'react';
import styled from 'styled-components';

import { ConnectedPresenceTable } from '../../modules/calendar/components/presenceTable/presenceTable.connector';

const Wrapper = styled.div`
  max-width: 48rem;
  margin: 0 auto;
`;


export const Calendar = () => (
  <Wrapper>
    <ConnectedPresenceTable />
  </Wrapper>
);
