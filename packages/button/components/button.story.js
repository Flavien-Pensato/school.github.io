import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { storiesOf } from '@storybook/react';
import { Button } from './button.component';

storiesOf('Button', module)
  .add('all', () => (
    <Container>
      <Row>
        <Col sm={4}>
          <Button>Hello Button</Button>
        </Col>
        <Col sm={4}>
          <Button type="primary">Hello man</Button>
        </Col>
        <Col sm={4}>
          <Button type="highlight">Hello purple</Button>
        </Col>
      </Row>
    </Container>
  ))
  .add('default', () => (
    <Container>
      <Row>
        <Col>
          <Button>Hello Button</Button>
        </Col>
      </Row>
    </Container>
  ))
  .add('primary', () => (
    <Container>
      <Row>
        <Col>
          <Button type="primary">Hello man</Button>
        </Col>
      </Row>
    </Container>
  ))
  .add('highlight', () => (
    <Container>
      <Row>
        <Col>
          <Button type="highlight">Hello purple</Button>
        </Col>
      </Row>
    </Container>
  ));
