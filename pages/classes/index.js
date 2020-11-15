import React from 'react';
import useSwr from 'swr';
import Link from 'next/link';
import { Input } from '@rebass/forms';
import { Box, Flex, Button } from 'rebass';

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
    }).then((response) => {
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
      <Box as="nav" variant="nav">
        <Link href="/classes/ajout">
          <a>Ajouter un éléve</a>
        </Link>
        <Link href="/classes/import">
          <a>Importer une classe</a>
        </Link>
      </Box>
      <Flex flexDirection="column">
        {Object.keys(classes).map((classe) => (
          <Dropdown
            key={classe}
            name={classe}
            items={classes[classe].map((student) => (
              <Flex key={student._id}>
                <Box width="100%">{student.fullName}</Box>
                <Box width="auto">
                  <Input type="number" value={student.groupe} onChange={updateGroupe(student._id)} />
                </Box>
                <Box>
                  <Button type="button" variant="secondary" onClick={handleRemove(student._id)}>
                    -
                  </Button>
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
