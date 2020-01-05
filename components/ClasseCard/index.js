import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import StudentList from '../StudentList';

import { Div, Span, Strong } from '../../elements';

const Card = styled(Div)`
  border: 1px solid;
  border-color: ${({ active }) => (active ? '#F58C18' : 'black')};
  border-radius: 4px;

  padding: 15px;
  margin: 15px 0px;
  cursor: pointer;
`;

const ClasseCard = ({ classeId, sort, name }) => {
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive(!active));

  return (
    <Card onClick={toggleActive} active={active}>
      <Div display="flex" justifyContent="space-between">
        <Span>{sort}.</Span>
        <Strong variant={active && 'primary'}>{name}</Strong>
      </Div>
      <Div>{active && <StudentList classeId={classeId} />}</Div>
    </Card>
  );
};

ClasseCard.propTypes = {
  sort: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  classeId: PropTypes.string.isRequired,
};

export default ClasseCard;
