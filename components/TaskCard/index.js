import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Button } from 'rebass';

const TaskCard = ({ tasksReference, taskId, name }) => {
  const onDelete = useCallback((event) => {
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
    <Box display="flex" justifyContent="space-between" margin="10px 0px">
      <Text>{name}</Text>
      <Button onClick={onDelete} marginLeft="20px" padding="5px 10px">
        -
      </Button>
    </Box>
  );
};

TaskCard.propTypes = {
  name: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  tasksReference: PropTypes.shape().isRequired,
};

export default TaskCard;
