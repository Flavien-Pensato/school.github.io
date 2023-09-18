import React from 'react';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Select, Input, Box, Heading, Text, Button } from '@chakra-ui/react';

import fetch from '../../../utils/fetch';

const StudentForm = () => {
  const { data: classes } = useSWR('/api/classes');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      groupe: 0,
      fullName: '',
      classe: '',
    },
  });

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
        alert(error?.message);
      });
  };

  console.log(errors);

  return (
    <Box as="form" mt={3} mx="auto" maxWidth="500px" onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h3" mb={3}>
        Création d’un&bull;e nouvel éléve
      </Heading>
      <Box mb={3}>
        <Text as="label" htmlFor="fullName">
          Nom
        </Text>
        <Input id="fullName" placeholder="Tim Burton" {...register('fullName')} />
        {errors.fullName && (
          <Text as="p" variant="error">
            {errors.fullName.message}
          </Text>
        )}
      </Box>
      <Box mb={3}>
        <Text as="label" htmlFor="classe">
          Classe
        </Text>
        <Select id="classe" {...register('classe')}>
          <option value="" selected disabled hidden>
            Choisir
          </option>
          {classes?.map((classe) => (
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
        <Text as="label" htmlFor="groupe">
          Groupe
        </Text>
        <Input id="groupe" type="number" {...register('groupe')} />
        {errors.groupe && (
          <Text as="p" variant="error">
            {errors?.groupe?.message}
          </Text>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button variant="primary" type="submit">
          Créer
        </Button>
      </Box>
    </Box>
  );
};

StudentForm.propTypes = {};

export default StudentForm;
