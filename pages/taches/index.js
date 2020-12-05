import React from 'react';
import Link from 'next/link';
import useSwr from 'swr';
import { Text, Box, Flex, Button, IconButton } from 'theme-ui';

import Layout from '../../components/Layout';
import fetch from '../../utils/fetch';

const Tasks = () => {
  const { data: tasks, error, mutate } = useSwr(`/api/tasks`, {
    initialData: [],
  });

  const onDelete = (id) => (event) => {
    event.preventDefault();

    if (
      window.confirm(
        'Êtes-vous sûre de vouloir supprimer cette classe (Tous les élèves et groupes concernés seront supprimé !) ?',
      )
    ) {
      fetch(`/api/task/${id}`, {
        method: 'DELETE',
      }).then(() => {
        mutate(
          tasks.filter((element) => element._id !== id),
          false,
        );
      });
    }
  };

  if (!tasks) {
    return <span>Loading</span>;
  }

  if (error) {
    return <span>{JSON.stringify(error)}</span>;
  }

  return (
    <Layout>
      {tasks.map(({ _id, name }) => (
        <Flex key={_id} sx={{ justifyContent: "space-between" }} margin="10px 0px">
          <Text>{name}</Text>
          <IconButton onClick={onDelete(_id)} marginLeft="20px" padding="5px 10px">
            <i className="fas fa-trash" />
          </IconButton>
        </Flex>
      ))}
      <Box margin={['20px 0px', '15px 0px']}>
        <Link href="/taches/ajout">
          <Button marginBottom={['10px', '0px']}>Créer une nouvelle tâche</Button>
        </Link>
      </Box>
    </Layout>
  );
};

export default Tasks;
