import React, { useEffect, useContext, useCallback, useState } from 'react';
import slug from 'slug';
import _ from 'lodash';
import styled from '@emotion/styled';

import { DisplayContext } from '../modules/display/display.context';
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

const Tasks = () => {
  const [tasks, setTasks] = useState();
  const { schoolYear } = useContext(DisplayContext);

  useEffect(() => {
    const tasksRef = firebase.database().ref(`/${schoolYear}/tasks`);

    const observer = tasksRef.on('value', snapshot => setTasks(snapshot.val()));

    return () => {
      tasksRef.off('value', observer);
    };
  }, [schoolYear]);

  const handleSubmitForm = useCallback(
    event => {
      event.preventDefault();

      const tasksRef = firebase.database().ref(`/${schoolYear}/tasks`);
      const name = event.target.task.value;

      tasksRef.child(slug(name)).set({ name });

      // eslint-disable-next-line
    event.target.task.value = "";
    },
    [schoolYear],
  );

  return (
    <TasksWrapper>
      <List>
        {_.map(tasks, (task, key) => (
          <Task key={key} id={key} {...task} />
        ))}
      </List>

      <Form onSubmit={handleSubmitForm}>
        <Fieldset>
          <Wrapper>
            <Input placeholder="Nouvelle tâche" type="text" name="task" />
            <Input type="submit" value="Ajouter" />
          </Wrapper>
        </Fieldset>
      </Form>
    </TasksWrapper>
  );
};

export default Tasks;
