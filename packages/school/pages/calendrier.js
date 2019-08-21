import React from 'react';
import styled from '@emotion/styled';

import { ConnectedPresenceTable } from '../modules/calendar/components/presenceTable/presenceTable.connector';

const Wrapper = styled.div`
  max-width: 48rem;
  margin: 0 auto;
`;


export default () => (
  <Wrapper>
    <ConnectedPresenceTable />
  </Wrapper>
);
