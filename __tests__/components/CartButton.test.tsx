// disable warning:
/* eslint-disable */
import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import {CartButton} from 'components/CartButton';
import renderer from 'react-test-renderer';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {theme} from 'theme';

jest.mock(
  'react-native-vector-icons/MaterialCommunityIcons',
  () => 'MaterialCommunityIcons',
);
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('CartButton', () => {
  beforeEach(() => {
    useNavigation.mockReset();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<CartButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should navigate to "CartStack" when pressed', () => {
    const navigateMock = jest.fn();
    useNavigation.mockReturnValue({navigate: navigateMock});

    const {getByTestId} = render(<CartButton />);

    const touchableOpacity = getByTestId('touchable-opacity');
    fireEvent.press(touchableOpacity);

    expect(navigateMock).toHaveBeenCalledWith('CartStack');
  });

  it('renders correctly with props', () => {
    const tree = renderer.create(<CartButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a TouchableOpacity', () => {
    const tree = renderer.create(<CartButton />);

    const touchableOpacity = tree.root.findByType(TouchableOpacity);
    expect(touchableOpacity).toBeDefined();
  });

  it('should render the correct icon with the correct props', () => {
    const {getByTestId} = render(<CartButton />);

    const materialCommunityIcons = getByTestId('cart-icon');

    expect(materialCommunityIcons.props.name).toBe('cart');
    expect(materialCommunityIcons.props.size).toBe(26);
    expect(materialCommunityIcons.props.color).toBe(
      theme.colors.primary.regular,
    );
  });
});
