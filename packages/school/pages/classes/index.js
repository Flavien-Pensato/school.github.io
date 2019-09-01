import React, { Component } from 'react';
import _ from 'lodash';
import { Container, Col } from 'react-bootstrap';

import firebase from '../../config/firebase';

import { DisplayContext } from '../../modules/display/display.context';

import { Form, Input, Fieldset } from '../../components/form';
import { Classe } from '../../components/classe';
import { List } from '../../components/list';

const classeRef = '/classes/';

class ClassesWrapper extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { classes: [] };
  }

  componentDidMount() {
    const { schoolYear } = this.context;

    this.reference = firebase
      .database()
      .ref(classeRef)
      .orderByChild('schoolYear')
      .equalTo(schoolYear);

    this.observer = this.reference.on('value', snapshot => {
      const classes = [];

      if (snapshot.exists()) {
        snapshot.forEach(classe => {
          classes.push({ key: classe.key, values: classe.val() });
        });
      }

      this.setState({
        classes,
      });
    });
  }

  componentWillUnmount() {
    this.reference.off('value', this.observer);
  }

  handleAdd = event => {
    event.preventDefault();

    const { schoolYear } = this.context;
    const newClasseKey = firebase
      .database()
      .ref()
      .child(classeRef)
      .push().key;

    const classe = {
      name: event.target.task.value,
      sort: 0,
      schoolYear,
    };

    firebase
      .database()
      .ref(classeRef + newClasseKey)
      .update(classe);
  };

  render() {
    const { classes } = this.state;

    return (
      <Container>
        <Col>
          <List>
            {_.sortBy(classes, 'values.sort').map(classe => (
              <Classe key={classe.key} id={classe.key} {...classe.values} />
            ))}
          </List>
        </Col>

        <Col>
          <Form onSubmit={this.handleAdd}>
            <Fieldset>
              <Input placeholder="Nouvelle classe" type="text" name="task" />
              <Input type="submit" value="Ajouter" />
            </Fieldset>
          </Form>
        </Col>
      </Container>
    );
  }
}

ClassesWrapper.contextType = DisplayContext;

export default ClassesWrapper;
