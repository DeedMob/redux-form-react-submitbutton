import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';

import { SubmitButton } from '../SubmitButton';


it('renders correctly', () => {
  const tree = renderer.create(<SubmitButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Changes text on pristine hover', () => {
  const component = shallow(
    <SubmitButton submitting={false} pristine />
  );

  component.find('button').simulate('mouseover');
  expect(component.find('button').props()).toMatchSnapshot('mouseover');

  component.find('button').simulate('mouseout');
  expect(component.find('button').props()).toMatchSnapshot('mouseout');
});


it('to disable `button` on invalid', () => {
  const wrapper = shallow(<SubmitButton invalid />);
  expect(wrapper.find('button').props().disabled).toBeTruthy;
});

it('to not disable `button` if not invalid', () => {
  const wrapper = shallow(<SubmitButton invalid={false} />);
  expect(wrapper.find('button').props().disabled).toBeFalsy;
});

it('to add submitText', () => {
  const wrapper = shallow(<SubmitButton type="Submit" labelSubmit="something" />);
  expect(wrapper.find('button').text()).toMatch(/something/);
});

it('allows us to set props', () => {
  const wrapper = mount(<SubmitButton foo="bar" />);
  expect(wrapper.props().foo).toEqual('bar');
  wrapper.setProps({ bar: 'foo' });
  expect(wrapper.props().bar).toEqual('foo');
});

it('renders exactly one `button`', () => {
  const wrapper = render(<SubmitButton />);
  expect(wrapper.find('button').length).toEqual(1);
});
