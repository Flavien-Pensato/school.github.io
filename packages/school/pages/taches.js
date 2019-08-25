import React, { Component } from 'react';
import styled from '@emotion/styled';
import slug from 'slug';

import firebase from '../config/firebase';

import { uuidv4 } from '../modules/utils';

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
      this.setState({
        tasks: snapshot.val() ? Object.values(snapshot.val()) : [],
      });
    });
  }

  componentWillUnmount() {
    this.reference.off('value', this.observer);
  }

  handleDelete = taskId => {
    firebase
      .database()
      .ref(taskRef + taskId)
      .remove();
  };

  handleAdd = event => {
    event.preventDefault();

    const task = {
      _id: uuidv4(),
      name: event.target.task.value,
    };
    firebase()
      .ref(taskRef + slug(task._id))
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
            <Task key={task.name} name={task.name} onRemove={this.handleDelete} />
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
