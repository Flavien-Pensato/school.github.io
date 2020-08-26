import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import slug from 'slug';
import XLSX from 'xlsx';

import { DisplayContext } from '../../../modules/display/display.context';
import firebase from '../../../config/firebase';

import { Form, Label, Button, H3, Span, Select } from '../../../elements';

const Add = ({ handleClose, classes }) => {
  const { schoolYear } = useContext(DisplayContext);

  const handleSubmit = useCallback(event => {
    event.preventDefault();
    try {
      console.log(event.target.file.value);
      const oFile = XLSX.read(event.target.file.value, {
        type: 'binary',
      });

      const worksheet = oFile.Sheets[oFile.SheetNames[0]];
      const text = _.replace(XLSX.utils.sheet_to_csv(worksheet, { raw: true }), new RegExp(',|"', 'g'), ' ');

      // const addStudentImported = addStudent(studentsReference, classeId);

      // Promise.all(
      _.split(text, '\n').forEach(line => {
        console.log(line.trim());
        // addStudentImported({ name: line.trim() });
      });
      // );
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <H3 m="0">Importer une classe</H3>
      <Label>
        <Span>Classe</Span>
        <br />
        <Select required name="classeId">
          {classes.map(classe => (
            <option key={classe.key} value={classe.key}>
              {classe.val().name}
            </option>
          ))}
        </Select>
      </Label>
      <br />
      <br />
      <input type="file" name="file" />
      <Span display="flex" justifyContent="space-between">
        <Button onClick={handleClose}>Fermer</Button>
        <Button type="submit" variant="primary">
          Importer
        </Button>
      </Span>
    </Form>
  );
};

Add.propTypes = {
  classes: PropTypes.shape().isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Add;
