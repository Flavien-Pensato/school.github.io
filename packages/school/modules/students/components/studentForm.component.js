import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

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

export class StudentForm extends React.Component {
  handleSubmitForm = (event) => {
    event.preventDefault();

    const { addStudent, match: { params: { classeId } } } = this.props;

    addStudent({
      name: event.target.name.value,
      groupe: event.target.groupe.value,
      classeId,
    });

    // eslint-disable-next-line
    event.target.name.value = '';
    // eslint-disable-next-line
    event.target.groupe.value = '';
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmitForm}>
        <Fieldset>
          <Wrapper>
            <Input placeholder="Nom Prénom" type="text" name="name" />
            <Input placeholder="Groupe" type="number" name="groupe" />
            <Input type="submit" value="Ajouter" />
          </Wrapper>
        </Fieldset>
      </Form>
    );
  }
}

StudentForm.propTypes = {
  addStudent: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};
