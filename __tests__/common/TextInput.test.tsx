import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import renderer from 'react-test-renderer';
import {TextInput} from 'common/TextInput';

describe('TextInput', () => {
  const onChangeText = jest.fn();
  const placeholder = 'Enter text';
  const value = 'Hello';
  const errorText = 'Invalid input';

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the component correctly', () => {
    const {getByPlaceholder} = render(
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />,
    );

    const input = getByPlaceholder(placeholder);
    expect(input.props.value).toBe(value);
  });

  it('calls onChangeText when the input text changes', () => {
    const {getByPlaceholder} = render(
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />,
    );

    const input = getByPlaceholder(placeholder);
    fireEvent.changeText(input, 'New text');

    expect(onChangeText).toHaveBeenCalledWith('New text');
  });

  it('displays error text when error is true', () => {
    const {getByText} = render(
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        errorText={errorText}
        error
      />,
    );

    const error = getByText(errorText);
    expect(error).toBeDefined();
  });
});
