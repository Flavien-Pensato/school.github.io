import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { storiesOf } from '@storybook/react';
import { Text } from './text.component';

storiesOf('Text', module)
  .add('all', () => (
    <Container>
      <Row>
        <Col sm={3}>
          <Text weight="lighter" size="tiny">Hello Button</Text>
        </Col>
        <Col sm={3}>
          <Text weight="normal">Hello man</Text>
        </Col>
        <Col sm={3}>
          <Text weight="bold" size="large">Hello purple</Text>
        </Col>
        <Col sm={3}>
          <Text size="larger">Hello purple</Text>
        </Col>
      </Row>
    </Container>
  ))
  .add('lighter, tiny', () => (
    <Container>
      <Row>
        <Col>
          <Text weight="lighter" size="tiny">Hello Button</Text>
        </Col>
      </Row>
    </Container>
  ))
  .add('normal', () => (
    <Container>
      <Row>
        <Col>
          <Text weight="normal">Hello man</Text>
        </Col>
      </Row>
    </Container>
  ))
  .add('bold, large', () => (
    <Container>
      <Row>
        <Col>
          <Text weight="bold" size="large">Hello purple</Text>
        </Col>
      </Row>
    </Container>
  ))
  .add('larger', () => (
    <Container>
      <Row>
        <Col>
          <Text size="larger">Hello purple</Text>
        </Col>
      </Row>
    </Container>
  ));
