import React from 'react';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Input, Box, Heading, Text, Button } from '@chakra-ui/react';

import fetch from '../../../utils/fetch';

const TaskForm = () => {
  useSWR('/api/tasks', fetch, {
    initialData: {
      data: [],
    },
  });
  const router = useRouter();
  const { register, handleSubmit, reset, setError, clearErrors, errors } = useForm();

  const onSubmit = async (student) => {
    fetch('/api/task/new', {
      method: 'POST',
      body: JSON.stringify(student),
    }).then(({ error }) => {
      if (error) {
        Object.keys(error.errors).map((errorKey) =>
          setError(errorKey, {
            type: 'manual',
            message: error.errors[errorKey].message,
          }),
        );
      } else {
        clearErrors();
        reset();
        router.push('/taches');
      }
    });
  };

  return (
    <Box
      as="form"
      sx={{
        boxSizing: 'border-box',
        padding: '15px',
        border: '1px solid black',
        borderRadius: '4px',
        textAlign: 'right',
        my: '7px',
      }}
      mx="auto"
      maxWidth="500px"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading as="h3" mb={3}>
        Création d’une nouvelle tâche
      </Heading>
      <Box mb={3}>
        <Text as="label" htmlFor="name">
          Nom
        </Text>
        <Input id="name" name="name" placeholder="Tim Burton" ref={register} />
        {errors.name && (
          <Text as="p" variant="error">
            {errors.name.message}
          </Text>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button variant="primary">Créer</Button>
      </Box>
    </Box>
  );
};

TaskForm.propTypes = {};

export default TaskForm;
