import React from 'react';
import useSwr from 'swr';
import Link from 'next/link';
import { Input, Box, Flex, Button, IconButton } from 'theme-ui';

import Dropdown from '../../components/Dropdown';
import { groupeByClassesFromStudents } from '../../modules/students/students.utils';

import fetch from '../../utils/fetch';
import Layout from '../../components/Layout';

const Classes = () => {
  const { data, mutate } = useSwr(`/api/students`, fetch, {
    initialData: {
      data: [],
    },
  });

  const handleRemove = (id) => () => {
    fetch(`/api/student/${id}`, {
      method: 'DELETE',
    }).then(() => {
      mutate(
        {
          data: data.data.filter((element) => element._id !== id),
        },
        false,
      );
    });
  };

  const updateGroupe = (id) => (event) => {
    const groupe = event.target.value;

    fetch(`/api/student/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        groupe,
      }),
    }).then((response) => {
      mutate(
        {
          data: data.data.map((element) => (element._id === id ? response : element)),
        },
        false,
      );
    });
  };

  const classes = groupeByClassesFromStudents(data.data);

  return (
    <Layout>
      <Flex sx={{ my: '20px', justifyContent: 'space-between' }}>
        <Link href="/classes/ajout">
          <Button>Ajouter un éléve</Button>
        </Link>
        <Link href="/classes/import">
          <Button>Importer une classe</Button>
        </Link>
      </Flex>
      <Flex sx={{ flexDirection: 'column' }}>
        {Object.keys(classes).map((classe) => (
          <Dropdown
            key={classe}
            name={classe}
            items={classes[classe].sort((a, b) => a.fullName.localeCompare(b.fullName)).map((student) => (
              <Flex key={student._id} variant="cardItem">
                <Box sx={{ width: '100%', textAlign: 'left' }}>{student.fullName}</Box>
                <Box sx={{ width: 'auto' }}>
                  <Input type="number" value={student.groupe} onChange={updateGroupe(student._id)} />
                </Box>
                <Box sx={{ width: '50px' }}>
                  <IconButton onClick={handleRemove(student._id)}>
                    <i className="fas fa-trash" />
                  </IconButton>
                </Box>
              </Flex>
            ))}
          />
        ))}
      </Flex>
    </Layout>
  );
};

export default Classes;
