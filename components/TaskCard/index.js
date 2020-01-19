import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Strong, Button, I, Div } from '../../elements';

const TaskCard = ({ tasksReference, taskId, name }) => {
  const onDelete = useCallback(event => {
    event.stopPropagation();
    event.preventDefault();

    if (
      window.confirm(
        'Êtes-vous sûre de vouloir supprimer cette classe (Tous les élèves et groupes concernés seront supprimé !) ?',
      )
    ) {
      tasksReference.child(taskId).remove();
    }
  });

  return (
    <Div display="flex" justifyContent="space-between" margin="10px 0px">
      <Strong>{name}</Strong>
      <Button onClick={onDelete} marginLeft="20px" padding="5px 10px">
        <I className="fas fa-trash" color="primary" />
      </Button>
    </Div>
  );
};

TaskCard.propTypes = {
  name: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  tasksReference: PropTypes.shape().isRequired,
};

export default TaskCard;
