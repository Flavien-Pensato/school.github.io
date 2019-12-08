import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import _ from 'lodash';
import { withRouter } from 'next/router';
import { Container, Row, Col, Nav } from 'react-bootstrap';

import { Form, Input, Fieldset } from '../components/form';
import { List } from '../components/list';
import { Student } from '../components/student';
import { FormStudents } from '../components/formStudents';

import { useStudents } from '../modules/students/studentes.use';

const Students = ({
  router: {
    query: { classeId },
  },
}) => {
  const [students, setStudents] = useState();
  const { addStudent, studentsReference, editStudent, moveStudent, removeStudent, importStudents } = useStudents(
    classeId,
  );

  useEffect(() => {
    const observer = studentsReference.on('value', snapshot => {
      setStudents(snapshot.val());
    });

    return () => {
      studentsReference.off('value', observer);
    };
  }, [studentsReference]);

  const handleNewStudent = useCallback(
    event => {
      event.preventDefault();
      addStudent({ name: event.target.name.value });
    },
    [classeId],
  );

  return (
    <Container>
      <Row>
        <Col>
          <Nav>
            <Nav.Item>
              <Link href="/classes">
                <Nav.Link href="/classes">Retour</Nav.Link>
              </Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col>
          <List>
            {_.map(students, (student, studentId) => (
              <Student
                editStudent={editStudent(studentId)}
                removeStudent={removeStudent(studentId)}
                moveStudent={moveStudent}
                key={studentId}
                id={studentId}
                {...student}
              />
            ))}
          </List>
        </Col>
      </Row>

      <Row>
        <Col>
          <FormStudents classeId={classeId} importStudents={importStudents} />
        </Col>
      </Row>

      <Col>
        <Form onSubmit={handleNewStudent}>
          <Fieldset>
            <Input placeholder="Ajouter un nouvel éléve" type="text" name="name" />
            <Input type="submit" value="Ajouter" />
          </Fieldset>
        </Form>
      </Col>
    </Container>
  );
};

Students.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      classeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(Students);
