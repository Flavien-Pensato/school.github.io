import React, { useState, useEffect } from 'react';
import { Container, Col } from 'react-bootstrap';
import _ from 'lodash';

import { Form, Input, Fieldset } from '../components/form';
import { Classe } from '../components/classe';
import { List } from '../components/list';
import { useClasses } from '../modules/classes/classes.use';

const ClassesWrapper = () => {
  const [classes, setClasses] = useState();
  const { classesReference, addClasse, editClasse, removeClasse } = useClasses();

  useEffect(() => {
    const observer = classesReference.on('value', snapshot => {
      setClasses(snapshot.val());
    });

    return () => {
      classesReference.off('value', observer);
    };
  }, [classesReference]);

  const handleSubmit = event => {
    event.preventDefault();

    addClasse({ name: event.target.name.value });
  };

  return (
    <Container>
      <Col>
        <List>
          {_.map(classes, (classe, classeId) => (
            <Classe
              key={classeId}
              {...classe}
              id={classeId}
              removeClasse={removeClasse(classeId)}
              editClasse={editClasse}
            />
          ))}
        </List>
      </Col>

      <Col>
        <Form onSubmit={handleSubmit}>
          <Fieldset>
            <Input placeholder="Nouvelle classe" type="name" name="name" />
            <Input type="submit" value="Ajouter" />
          </Fieldset>
        </Form>
      </Col>
    </Container>
  );
};

export default ClassesWrapper;
