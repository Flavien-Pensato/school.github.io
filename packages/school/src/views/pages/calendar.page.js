import React from 'react';
import styled from 'styled-components';

import Table from '../../modules/calendar/components/table.connector';

const Wrapper = styled.div`
  max-width: 48rem;
  margin: 0 auto;
`;


export const Calendar = () => (
  <Wrapper>
    <Table />
  </Wrapper>
);
