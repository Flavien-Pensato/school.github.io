import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { uuidv4 } from '../../../utils';

const Form = styled.form`
  width: 100%;

  }
`;

const Input = styled.input`
  font-size: .875rem;
  text-align: center;
  padding: 1rem;
`;

const Fieldset = styled.fieldset`
  display: table-cell;
  padding: 0;
  margin: 0;

  min-width: 0;
  width: 100%;

  border: 0;
`;

const Wrapper = styled.div`
  input:first-child {
    width: 75%;
    border-radius: .25rem 0 0 .25rem;
    border-width: 1px 1px 1px 1px ;
    border-color: rgba(0,0,0,.1);
    border-style: solid;
    border-right: none;
  }

  input:last-child {
    width: 25%;
    background-color: rgba(0,0,0,.7);
    color: #fff;

    border-radius: 0 .25rem .25rem 0;
    border-width: 1px 1px 1px 1px ;
    border-color: rgba(0,0,0,.1);
    border-style: solid;
    border-left: none;
  }
`;

export class TaskForm extends React.Component {
  handleSubmitForm = (event) => {
    event.preventDefault();

    this.props.addTask({
      _id: uuidv4(),
      name: event.target.task.value,
    });

    // eslint-disable-next-line
    event.target.task.value = '';
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmitForm}>
        <Fieldset>
          <Wrapper>
            <Input placeholder="Nouvelle tâche" type="text" name="task" />
            <Input type="submit" value="Ajouter" />
          </Wrapper>
        </Fieldset>
      </Form>
    );
  }
}

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};
