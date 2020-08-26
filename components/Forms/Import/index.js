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
      if (event.target.file.files.length) {
        const file = event.target.file.files[0];
        const classeId = event.target.classeId.value;
        const fileReader = new FileReader();

        fileReader.onload = e => {
          const bytes = new Uint8Array(e.target.result);
          const length = bytes.byteLength;

          let binary = '';

          // eslint-disable-next-line
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }

          const oFile = XLSX.read(binary, {
            type: 'binary',
          });

          const worksheet = oFile.Sheets[oFile.SheetNames[0]];
          const text = _.replace(XLSX.utils.sheet_to_csv(worksheet, { raw: true }), new RegExp(',|"', 'g'), ' ');

          Promise.all(
            _.split(text, '\n').map(line => {
              const student = {
                name: line.trim(),
                groupe: 0,
                classeId,
              };

              if (slug(student.name)) {
                const reference = firebase
                  .database()
                  .ref(`/${schoolYear}/students`)
                  .child(slug(student.name));

                return reference.once('value').then(snapshot => {
                  if (!snapshot.exists()) {
                    reference.set(student);
                    handleClose();
                  } else {
                    alert('Vous allez écraser un autre étudiant du même nom et prénom !');
                  }
                });
              }

              return Promise.resolve();
            }),
          );
        };
        fileReader.readAsArrayBuffer(file);
      }
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
