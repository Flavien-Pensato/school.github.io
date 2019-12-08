import React from 'react';

import styled from '@emotion/styled';

export const Wrapper = styled.div`
  max-width: 48rem;
  margin: 0 auto;

  @media (max-width: 700px) {
    padding: 1rem;
  }
`;

export const Loader = () => <Wrapper>Loading</Wrapper>;
