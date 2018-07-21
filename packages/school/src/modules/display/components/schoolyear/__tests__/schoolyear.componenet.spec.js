import React from 'react';
import { shallow } from 'enzyme';
import { SchoolYear } from '../schoolyear.component';

describe('<SchoolYear />', () => {
  const props = {};
  const getWrapper = () => shallow(<SchoolYear {...props} />);

  beforeEach(() => {
    props.current = '9';
  });

  it('should render normally', () => {
    expect(getWrapper()).toMatchSnapshot();
  });
});
