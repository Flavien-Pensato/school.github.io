import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import XLSX from 'xlsx';
import { useRouter } from 'next/router';
import { Input, Flex, Box, Heading, Text, Button } from '@chakra-ui/react';

import Layout from '../../../components/Layout';

const fetcher = (url, options) =>
  fetch(url, options)
    .then((res) => res.json())
    .catch((res) => res.json());

const StudentsForm = () => {
  const router = useRouter();
  const { register, handleSubmit, reset, clearErrors, control } = useForm({
    defaultValues: { students: [{ fullName: '', classe: '', groupe: 0 }] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'students',
  });

  const handleFile = (event) => {
    event.preventDefault();

    const file = event.target.files[0];

    if (file) {
      const classe = file.name.replace('.xlsx', '').replace('Liste ', '');
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const bytes = new Uint8Array(e.target.result);
        const length = bytes.byteLength;

        let binary = '';

        // eslint-disable-next-line
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }

        const oFile = XLSX.read(binary, {
          type: 'binary',
        });

        const worksheet = oFile.Sheets[oFile.SheetNames[0]];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const text = XLSX.utils.sheet_to_csv(worksheet, { raw: true }).replace(new RegExp(',|"', 'g'), ' ');

        text.split('\n').forEach((line) => {
          const student = {
            fullName: line.trim(),
            classe,
            groupe: 0,
          };

          if (classe && line.trim()) {
            append(student);
          }
        });
      };

      fileReader.readAsArrayBuffer(file);
    }
  };

  const onSubmit = async (student) => {
    fetcher('/api/students', {
      method: 'POST',
      body: JSON.stringify(student),
    }).then(({ error }) => {
      if (error) {
        alert(error?.message);
      } else {
        clearErrors();
        reset();
        router.push('/classes');
      }
    });
  };

  return (
    <Layout>
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
        maxWidth="800px"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading as="h3" mb={3}>
          Création d’un&bull;e nouvel éléve
        </Heading>
        <Box mb={3}>
          <Text as="label" htmlFor="file">
            Fichier d&apos;import
          </Text>
          <Input name="file" type="file" onChange={handleFile} />
        </Box>
        {fields.map((item, index) => (
          <Flex mb={3} key={item.id} alignItems="end">
            <Box mr={1} width="100%">
              {index === 0 && (
                <Text as="label" htmlFor="fullName">
                  Nom
                </Text>
              )}
              <Input id="fullName" placeholder="Tim Burton" {...register(`students.${index}.fullName`)} />
            </Box>
            <Box mr={1}>
              {index === 0 && (
                <Text as="label" htmlFor="classe">
                  Classe
                </Text>
              )}
              <Input id="classe" {...register(`students.${index}.classe`)} readOnly />
            </Box>
            <Box mr={1}>
              {index === 0 && (
                <Text as="label" htmlFor="groupe">
                  Groupe
                </Text>
              )}
              <Input id="groupe" type="number" {...register(`students.${index}.groupe`)} />
            </Box>
            <Box>
              <Button type="button" variant="secondary" height="42px" width="42px" onClick={() => remove(index)}>
                -
              </Button>
            </Box>
          </Flex>
        ))}
        <Box display="flex" justifyContent="space-between">
          <Button variant="primary">Importer</Button>
        </Box>
      </Box>
    </Layout>
  );
};

StudentsForm.propTypes = {};

export default StudentsForm;
