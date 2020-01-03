import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Div, Input, Strong, Span } from '../../elements';

const Card = styled(Div)`
  border: 1px solid;
  border-color: ${({ active }) => (active ? '#F58C18' : 'black')};
  border-radius: 4px;

  padding: 15px;
  margin: 15px 0px;
  cursor: pointer;
`;

const StudentCard = ({ studentId, name, groupe }) => {
  const handle = event => event.stopPropagation();

  return (
    <Div display="flex" justifyContent="space-between">
      <Strong>
        <Input type="text" value={name} onClick={handle} fontWeight="bold" />
      </Strong>
      <Span>
        Groupe&nbsp;
        <Input type="number" value={groupe} onClick={handle} fontWeight="bold" />
      </Span>
    </Div>
  );
};

StudentCard.propTypes = {
  studentId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  groupe: PropTypes.number.isRequired,
};
export default StudentCard;
