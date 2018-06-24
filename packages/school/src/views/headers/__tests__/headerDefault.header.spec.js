import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { HeaderDefault } from '../headerDefault.header';

describe('Header default', () => {
  const props = {};
  const getWrapper = () => shallow(<HeaderDefault {...props} />);

  beforeEach(() => {
    Date.now = jest.fn(() => 1487076708000);
    props.currentWeek = moment();
    props.signOutAction = jest.fn();
  });

  it('should render correctly', () => {
    expect(getWrapper()).toMatchSnapshot();
  });
});