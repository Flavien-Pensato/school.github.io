import React, { Component } from 'react';
import styled from '@emotion/styled';

import firebase from '../config/firebase';

import { Form, Input, Fieldset } from '../components/form';
import { List } from '../components/list';
import { Task } from '../components/task';

const TasksWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 24rem;
`;

const Wrapper = styled.div`
  input:first-child {
    width: 75%;
    border-radius: 0.25rem 0 0 0.25rem;
    border-width: 1px 1px 1px 1px;
    border-color: rgba(0, 0, 0, 0.1);
    border-style: solid;
    border-right: none;
  }

  input:last-child {
    width: 25%;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;

    border-radius: 0 0.25rem 0.25rem 0;
    border-width: 1px 1px 1px 1px;
    border-color: rgba(0, 0, 0, 0.1);
    border-style: solid;
    border-left: none;
  }
`;

const taskRef = '/tasks/';

class TaskWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { tasks: [] };
  }
  componentDidMount() {
    this.reference = firebase.database().ref(taskRef);
    this.observer = this.reference.on('value', snapshot => {
      const tasks = [];

      if (snapshot.exists()) {
        snapshot.forEach(task => {
          tasks.push({ key: task.key, values: task.val() });
        });
      }

      this.setState({
        tasks,
      });
    });
  }

  componentWillUnmount() {
    this.reference.off('value', this.observer);
  }

  handleSubmitForm = event => {
    event.preventDefault();

    const newClasseKey = firebase
      .database()
      .ref()
      .child(taskRef)
      .push().key;

    const task = {
      name: event.target.task.value,
    };

    firebase
      .database()
      .ref(taskRef + newClasseKey)
      .set(task);

    // eslint-disable-next-line
    event.target.task.value = "";
  };

  render() {
    const { tasks } = this.state;

    return (
      <TasksWrapper>
        <List>
          {tasks.map(task => (
            <Task key={task.key} id={task.key} {...task.values} />
          ))}
        </List>

        <Form onSubmit={this.handleSubmitForm}>
          <Fieldset>
            <Wrapper>
              <Input placeholder="Nouvelle tâche" type="text" name="task" />
              <Input type="submit" value="Ajouter" />
            </Wrapper>
          </Fieldset>
        </Form>
      </TasksWrapper>
    );
  }
}

export default TaskWrapper;
