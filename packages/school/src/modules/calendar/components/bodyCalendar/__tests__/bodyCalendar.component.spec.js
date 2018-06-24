import React from 'react';
import { shallow } from 'enzyme';

import { BodyCalendar } from '../bodyCalendar.component';

jest.unmock('../bodyCalendar.component');

describe('Body calendar', () => {
  const props = {};
  const getWrapper = () => shallow(<BodyCalendar {...props} />);

  beforeEach(() => {
    props.fetchWeeksAction = jest.fn();
    props.match = { params: {} };
  });

  it('should render no week found', () => {
    expect(getWrapper()).toMatchSnapshot();
  });

  it('should render normally', () => {
    props.week = {
      tasks: [],
    };
    expect(getWrapper()).toMatchSnapshot();
  });
});
