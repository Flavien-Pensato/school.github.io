import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  font-size: 1rem;
  color: black;
  border-style: solid;
  border-width: 1px;
  background-color: black;
  color: white;
  padding: 0.5rem;

  @media (max-width: 700px) {
    span {
      display: none;
    }

    height: 24px;
    width: 24px;
    padding: 0;
    background-color: transparent;
    border: none;
  }

`;

export const CalendarButton = props => <ButtonStyle {...props} />;
