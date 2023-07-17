import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import {ProductCard} from 'components/ProductCard';
import {Dimensions} from 'react-native';
import {theme} from 'theme';

const HEIGHT = Dimensions.get('window').height;

describe('ProductCard', () => {
  const product = {
    id: 1,
    title: 'Product 1',
    price: 10,
    image: 'https://example.com/image.png',
    category: 'Category 1',
    description: 'Description 1',
    rating: {
      rate: 4.5,
      count: 10,
    },
  };

  it('renders the component correctly', () => {
    const onPress = jest.fn();
    const {toJSON} = render(
      <ProductCard onPress={onPress} product={product} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders the ProductCard component', () => {
    const onPress = jest.fn();

    const {getByTestId} = render(
      <ProductCard onPress={onPress} product={product} />,
    );

    expect(getByTestId('productCard')).toBeTruthy();
  });

  it('calls the onPress callback when the card is pressed', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <ProductCard onPress={onPress} product={product} />,
    );

    const card = getByTestId('productCard');
    fireEvent.press(card);

    expect(onPress).toHaveBeenCalled();
  });

  it('renders the product title', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <ProductCard onPress={onPress} product={product} />,
    );

    expect(getByText(product.title)).toBeTruthy();
  });

  it('renders the product price', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <ProductCard onPress={onPress} product={product} />,
    );

    expect(getByText(`${product.price} TL`)).toBeTruthy();
  });

  it('renders the product image', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <ProductCard onPress={onPress} product={product} />,
    );

    expect(getByTestId('productImage')).toHaveProperty('props.source', {
      uri: product.image,
    });
  });

  it('renders the container with the correct styles', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <ProductCard onPress={onPress} product={product} />,
    );

    expect(getByTestId('productCard')).toHaveProperty('props.style', {
      borderRadius: theme.radius,
      overflow: 'hidden',
      backgroundColor: theme.colors.secondary.transparent,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: HEIGHT / 6,
      height: HEIGHT / 4,
      borderWidth: 1,
      borderColor: theme.colors.secondary.regular,
      opacity: 1,
    });
  });

  it('renders the image with the correct styles', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <ProductCard onPress={onPress} product={product} />,
    );

    expect(getByTestId('productImage')).toHaveProperty('props.style', {
      width: HEIGHT / 6,
      height: HEIGHT / 6,
    });
  });

  it('renders the product title with the correct styles', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <ProductCard onPress={onPress} product={product} />,
    );

    expect(getByText(product.title)).toHaveProperty('props.style', {
      fontWeight: 'bold',
      fontSize: theme.text.size.sm.fontSize,
      lineHeight: theme.text.size.sm.lineHeight,
      color: theme.colors.base.dark,
      width: '100%',
      flexWrap: 'wrap',
    });
  });

  it('renders the product price with the correct styles', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <ProductCard onPress={onPress} product={product} />,
    );

    expect(getByText(`${product.price} TL`)).toHaveProperty('props.style', {
      fontWeight: 'bold',
      fontSize: theme.text.size.sm.fontSize,
      lineHeight: theme.text.size.sm.lineHeight,
      color: theme.colors.primary.regular,
      width: '100%',
      flexWrap: 'wrap',
    });
  });

  it('renders the image with the correct resizeMode', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <ProductCard onPress={onPress} product={product} />,
    );

    expect(getByTestId('productImage')).toHaveProperty(
      'props.resizeMode',
      'contain',
    );
  });
});
