import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';

import { SubmitButton } from '../index';

const defaultProps = {
  submitting: false,
  submitFailed: false,
  submitSucceeded: false,
  invalid: false,
  pristine: false,
  dirty: false,
  syncErrors: {},
  syncWarnings: {},
};

it('renders correctly', () => {
  const tree = renderer.create(<SubmitButton {...defaultProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders syncErrors correctly', () => {
  const tree = renderer.create(<SubmitButton {...defaultProps} syncErrors={{ field1: 'Field 1 error', field2: 'Field 2 Error' }} />).toJSON();
  expect(tree).toMatchSnapshot('errorAlert');
});


it('Changes text on invalid click', () => {
  const component = shallow(<SubmitButton {...defaultProps} invalid />);

  expect(component.find('div').props()).toMatchSnapshot('beforeClickInvalid');
  component.find('button').simulate('click');
  expect(component.find('div').props()).toMatchSnapshot('afterClickInvalid');
});


it('to disable `button` on invalid', () => {
  const wrapper = shallow(<SubmitButton {...defaultProps} invalid />);
  expect(wrapper.find('button').props().disabled).toBeTruthy;
});

it('to not disable `button` if not invalid', () => {
  const wrapper = shallow(<SubmitButton {...defaultProps} />);
  expect(wrapper.find('button').props().disabled).toBeFalsy;
});

it('to add submitText', () => {
  const wrapper = shallow(<SubmitButton {...defaultProps} type="Submit" labelSubmit="something" />);
  expect(wrapper.find('button').text()).toMatch(/something/);
});

it('allows us to set props', () => {
  const wrapper = mount(<SubmitButton {...defaultProps} foo="bar" />);
  expect(wrapper.props().foo).toEqual('bar');
  wrapper.setProps({ bar: 'foo' });
  expect(wrapper.props().bar).toEqual('foo');
});

it('renders exactly one `button`', () => {
  const wrapper = render(<SubmitButton {...defaultProps} />);
  expect(wrapper.find('button').length).toEqual(1);
});
