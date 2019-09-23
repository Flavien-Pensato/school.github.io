import React from 'react';
import { Container, Col } from 'react-bootstrap';

import { forMap } from '../modules/utils';
import { Form, Input, Fieldset } from '../components/form';
import { Classe } from '../components/classe';
import { List } from '../components/list';

import { useClasses } from '../modules/classes/classes.use';

const ClassesWrapper = () => {
  const { classes, addClasse, editClasse, removeClasse } = useClasses();

  const handleNewClasse = event => {
    event.preventDefault();

    addClasse({ name: event.target.name.value });
  };

  return (
    <Container>
      <Col>
        <List>
          {forMap(classes, classe => (
            <Classe
              key={classe.key}
              id={classe.key}
              {...classe.val()}
              editClasse={editClasse}
              removeClasse={removeClasse}
            />
          ))}
        </List>
      </Col>

      <Col>
        <Form onSubmit={handleNewClasse}>
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
