import React from 'react';
import renderer from 'react-test-renderer';
import {Button} from 'common/Button';
import {TouchableOpacity} from 'react-native';

describe('Button component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Button text="Click me" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onPress function when clicked', () => {
    const onPressMock = jest.fn();
    const component = renderer.create(
      <Button text="Click me" onPress={onPressMock} />,
    );
    const buttonInstance = component.root.findByType(TouchableOpacity);
    buttonInstance.props.onPress();
    expect(onPressMock).toHaveBeenCalled();
  });

  it('disables button when loading is true', () => {
    const component = renderer.create(<Button text="Click me" loading />);
    const buttonInstance = component.root.findByType(TouchableOpacity);
    expect(buttonInstance.props.disabled).toBe(true);
  });

  it('disables button when disabled prop is true', () => {
    const component = renderer.create(<Button text="Click me" disabled />);
    const buttonInstance = component.root.findByType(TouchableOpacity);
    expect(buttonInstance.props.disabled).toBe(true);
  });
});
