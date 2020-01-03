import React, { useContext } from 'react';
import _ from 'lodash';
import { useListVals } from 'react-firebase-hooks/database';

import { DisplayContext } from '../modules/display/display.context';
import firebase from '../config/firebase';
import ClasseCard from '../components/ClasseCard';

const ClassesWrapper = () => {
  const { schoolYear } = useContext(DisplayContext);
  const [classes, loading, error] = useListVals(firebase.database().ref(`/${schoolYear}/classes`));

  return _.map(_.sortBy(classes, ['sort']), (classe, index) => <ClasseCard key={index} {...classe} />);
  // <Container>
  //   <Col>
  //     <List>
  //     </List>
  //   </Col>

  //   <Col>
  //     <Form onSubmit={handleSubmit}>
  //       <Fieldset>
  //         <Input placeholder="Nouvelle classe" type="name" name="name" />
  //         <Input type="submit" value="Ajouter" />
  //       </Fieldset>
  //     </Form>
  //   </Col>
  // </Container>
};

export default ClassesWrapper;
