import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import {CartItem} from 'components/CartItem';

jest.mock(
  'react-native-vector-icons/MaterialCommunityIcons',
  () => 'MaterialCommunityIcons',
);

describe('CartItem', () => {
  const mockProduct = {
    id: 1,
    title: 'Product 1',
    price: 10,
    quantity: 2,
    image: 'https://example.com/image.png',
    category: 'Category 1',
    description: 'Description 1',
    rating: {
      rate: 4.5,
      count: 10,
    },
  };

  const mockProps = {
    product: mockProduct,
    onPlusPress: jest.fn(),
    onMinusPress: jest.fn(),
    onDelete: jest.fn(),
    onPress: jest.fn(),
  };

  it('renders correctly', () => {
    const {toJSON} = render(<CartItem {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when TouchableOpacity is pressed', () => {
    const {getByTestId} = render(<CartItem {...mockProps} />);
    const touchableOpacity = getByTestId('touchable');
    fireEvent.press(touchableOpacity);
    expect(mockProps.onPress).toHaveBeenCalledWith(mockProduct);
  });

  it('calls onMinusPress when "-" button is pressed', () => {
    const {getByText} = render(<CartItem {...mockProps} />);
    const minusButton = getByText('-');
    fireEvent.press(minusButton);
    expect(mockProps.onMinusPress).toHaveBeenCalledWith(mockProduct);
  });

  it('calls onPlusPress when "+" button is pressed', () => {
    const {getByText} = render(<CartItem {...mockProps} />);
    const plusButton = getByText('+');
    fireEvent.press(plusButton);
    expect(mockProps.onPlusPress).toHaveBeenCalledWith(mockProduct);
  });

  it('calls onDelete when trash icon is pressed', () => {
    const {getByTestId} = render(<CartItem {...mockProps} />);
    const trashIcon = getByTestId('trash-icon');
    fireEvent.press(trashIcon);
    expect(mockProps.onDelete).toHaveBeenCalledWith(mockProduct);
  });

  it('renders the correct product title', () => {
    const {getByText} = render(<CartItem {...mockProps} />);
    const productTitle = getByText(mockProduct.title);
    expect(productTitle).toBeDefined();
  });

  it('renders the correct product price', () => {
    const {getByText} = render(<CartItem {...mockProps} />);
    const productPrice = getByText(
      `${mockProduct.price} × ${mockProduct.quantity} = ${
        mockProduct.price * mockProduct.quantity
      } TL`,
    );
    expect(productPrice).toBeDefined();
  });

  it('calls the correct functions with the correct arguments when buttons are pressed', () => {
    const {getByText, getByTestId} = render(<CartItem {...mockProps} />);
    const minusButton = getByText('-');
    const plusButton = getByText('+');
    const trashIcon = getByTestId('trash-icon');

    fireEvent.press(minusButton);
    fireEvent.press(plusButton);
    fireEvent.press(trashIcon);

    expect(mockProps.onMinusPress).toHaveBeenCalledWith(mockProduct);
    expect(mockProps.onPlusPress).toHaveBeenCalledWith(mockProduct);
    expect(mockProps.onDelete).toHaveBeenCalledWith(mockProduct);
  });

  it('renders the product image correctly', () => {
    const {getByTestId} = render(<CartItem {...mockProps} />);
    const productImage = getByTestId('product-image');
    expect(productImage.props.source.uri).toBe(mockProduct.image);
  });

  it('renders the correct quantity when minus button is pressed', async () => {
    const {getByText} = render(<CartItem {...mockProps} />);
    const minusButton = getByText('-');
    await fireEvent.press(minusButton);
    const productQuantity = getByText(`${mockProduct.quantity}`);
    expect(productQuantity).toBeDefined();
  });
});
