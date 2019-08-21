import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { storiesOf } from '@storybook/react';
import { FormField } from './formField.component';

storiesOf('Text', module).add('all', () => (
  <Container>
    <Row>
      <Col sm={3}>
        <FormField>
          <input />
        </FormField>
      </Col>
    </Row>
  </Container>
));
