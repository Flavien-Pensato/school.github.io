import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Div, Input, Strong, Span, Button, I } from '../../elements';

const StudentCard = ({ studentsReference, studentId, name, groupe }) => {
  const groupeChange = useCallback(event => {
    event.stopPropagation();
    event.preventDefault();

    studentsReference
      .child(studentId)
      .child('groupe')
      .set(Number(event.target.value));
  });

  const nameChange = useCallback(event => {
    event.stopPropagation();
    event.preventDefault();

    studentsReference
      .child(studentId)
      .child('name')
      .set(event.target.value);
  });

  const onDelete = useCallback(event => {
    event.stopPropagation();
    event.preventDefault();

    if (window.confirm('Êtes-vous sûre de vouloir supprimer cet élève ?')) {
      studentsReference.child(studentId).remove();
    }
  });

  return (
    <Div
      display="flex"
      justifyContent="space-between"
      flexDirection={['column', 'row']}
      marginTop="20px"
      style={{ cursor: 'initial' }}
      bg="black-025"
      padding="5px"
      borderRadius="2px"
      onClick={event => event.stopPropagation()}
    >
      <Strong>
        <Input type="text" value={name} onChange={nameChange} fontWeight="bold" padding="8px 0px" />
      </Strong>
      <Span display="flex" justifyContent={['space-between', 'initial']}>
        <Span>
          Groupe&nbsp;
          <Input type="number" width="60px" value={groupe} onChange={groupeChange} min="0" fontWeight="bold" />
        </Span>
        <Button onClick={onDelete} marginLeft="20px" padding="5px 10px">
          <I className="fas fa-trash" color="primary" />
        </Button>
      </Span>
    </Div>
  );
};

StudentCard.propTypes = {
  studentId: PropTypes.string.isRequired,
  studentsReference: PropTypes.shape().isRequired,
  name: PropTypes.string.isRequired,
  groupe: PropTypes.number.isRequired,
};
export default StudentCard;
