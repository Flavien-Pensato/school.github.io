import React from 'react';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Label, Select, Input, Box, Heading, Text, Button } from 'theme-ui';

import fetch from '../../../utils/fetch';

const StudentForm = () => {
  const { data: classes } = useSWR('/api/classes', fetch, {
    initialData: [],
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (student) => {
    fetch('/api/student/new', {
      method: 'POST',
      body: JSON.stringify(student),
    })
      .then(() => {
        clearErrors();
        reset();
        router.push('/classes');
      })
      .catch((error) => {
        Object.keys(error.errors).map((errorKey) =>
          setError(errorKey, {
            type: 'manual',
            message: error.errors[errorKey].message,
          }),
        );
      });
  };

  return (
    <Box as="form" mt={3} mx="auto" maxWidth="500px" onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h3" mb={3}>
        Création d’un&bull;e nouvel éléve
      </Heading>
      <Box mb={3}>
        <Label htmlFor="fullName">Nom</Label>
        <Input id="fullName" placeholder="Tim Burton" {...register('fullName')} />
        {errors.fullName && (
          <Text as="p" variant="error">
            {errors.fullName.message}
          </Text>
        )}
      </Box>
      <Box mb={3}>
        <Label htmlFor="classe">Classe</Label>
        <Select id="classe" {...register('classe')}>
          {classes.map((classe) => (
            <option key={classe} value={classe}>
              {classe}
            </option>
          ))}
        </Select>
        {errors.classe && (
          <Text as="p" variant="error">
            {errors.classe.message}
          </Text>
        )}
      </Box>
      <Box mb={3}>
        <Label htmlFor="groupe">Groupe</Label>
        <Input id="groupe" type="number" {...register('groupe')} />
        {errors.groupe && (
          <Text as="p" variant="error">
            {errors.groupe.message}
          </Text>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button variant="primary">Créer</Button>
      </Box>
    </Box>
  );
};

StudentForm.propTypes = {};

export default StudentForm;
