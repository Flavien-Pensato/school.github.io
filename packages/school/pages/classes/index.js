import React, { Component } from 'react';
import { Wrapper } from '@school/ui';

import firebase from '../../config/firebase';

import { uuidv4 } from '../../modules/utils';
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
      this.setState({
        classes: snapshot.val() ? Object.values(snapshot.val()) : [],
      });
    });
  }

  componentWillUnmount() {
    this.reference.off('value', this.observer);
  }

  handleAdd = event => {
    event.preventDefault();

    const { schoolYear } = this.context;
    const classe = {
      _id: uuidv4(),
      name: event.target.task.value,
      schoolYear,
    };

    firebase
      .database()
      .ref(classeRef + classe._id)
      .set(classe);
  };

  handleDelete = _id => () => {
    firebase
      .database()
      .ref(classeRef + _id)
      .remove();
  };

  render() {
    const { classes } = this.state;

    return (
      <Wrapper>
        <List>
          {classes.map(classe => (
            <Classe key={classe.name} name={classe.name} onDelete={this.handleDelete(classe._id)} />
          ))}
        </List>

        <Form onSubmit={this.handleAdd}>
          <Fieldset>
            <Wrapper>
              <Input placeholder="Nouvelle classe" type="text" name="task" />
              <Input type="submit" value="Ajouter" />
            </Wrapper>
          </Fieldset>
        </Form>
      </Wrapper>
    );
  }
}

ClassesWrapper.contextType = DisplayContext;

export default ClassesWrapper;
