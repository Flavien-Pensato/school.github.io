import React from 'react';
import styled from '@emotion/styled';

const SvgLogo = styled.svg`
  display: none;

  @media (max-width: 700px) {
    display: inline;
    right: 20px;
    top: 20px;
    height: 24px;
    width: 24px;
  }
`;

export const Trash = () => (
  <SvgLogo>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgLogo>
);
