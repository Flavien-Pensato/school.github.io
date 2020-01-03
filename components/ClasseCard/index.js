import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useListVals } from 'react-firebase-hooks/database';

import { DisplayContext } from '../../modules/display/display.context';
import firebase from '../../config/firebase';

import { Div, Span, Strong } from '../../elements';

const Card = styled(Div)`
  border: 1px solid;
  border-color: ${({ active }) => (active ? '#F58C18' : 'black')};
  border-radius: 4px;

  padding: 15px;
  margin: 15px 0px;
  cursor: pointer;
`;

const List = () => {
  const { schoolYear } = useContext(DisplayContext);
  const studentsReference = firebase.database().ref(`/${schoolYear}/students`);
  const [students, loading, error] = useListVals(studentsReference);

  return students.map(student => student.name);
};

const ClasseCard = ({ sort, name }) => {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  return (
    <Card onClick={toggleActive} active={active}>
      <Div display="flex" justifyContent="space-between">
        <Span>{sort}.</Span>
        <Strong variant={active && 'primary'}>{name}</Strong>
      </Div>
      <Div>{active && <List />}</Div>
    </Card>
  );
};

ClasseCard.propTypes = {
  sort: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default ClasseCard;
