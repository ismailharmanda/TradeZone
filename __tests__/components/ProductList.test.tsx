import React from 'react';
import {render} from 'react-native-testing-library';
import {ProductsList} from 'components/ProductList';
import {View} from 'react-native';
import {theme} from 'theme';

describe('ProductsList', () => {
  const ListEmptyComponent = <View testID="emptyComponent" />;
  const renderItem = jest.fn();

  const category = 'Category 1';
  const data = [
    {
      id: 1,
      title: 'Product 1',
      price: 10,
      image: 'https://example.com/image.png',
      category: 'Category 1',
      description: 'Description 1',
      rating: {rate: 4.5, count: 10},
    },
  ];
  const dataWithMultipleProducts = [
    {
      id: 1,
      title: 'Product 1',
      price: 10,
      image: 'https://example.com/image.png',
      category: 'Category 1',
      description: 'Description 1',
      rating: {rate: 4.5, count: 10},
    },
    {
      id: 2,
      title: 'Product 2',
      price: 10,
      image: 'https://example.com/image2.png',
      category: 'Category 2',
      description: 'Description 2',
      rating: {rate: 4.5, count: 10},
    },
  ];

  it('renders the component correctly', () => {
    const {toJSON} = render(
      <ProductsList
        category={category}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders the ProductsList component', () => {
    const {getByTestId} = render(
      <ProductsList
        category={category}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />,
    );

    expect(getByTestId('productsList')).toBeTruthy();
  });

  it('renders the FlatList component', () => {
    const {getByTestId} = render(
      <ProductsList
        category={category}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />,
    );

    expect(getByTestId('flatList')).toBeTruthy();
  });

  it('renders the category text', () => {
    const {getByText} = render(
      <ProductsList
        category={category}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />,
    );

    expect(getByText(category)).toBeTruthy();
  });

  it('renders the item separator', () => {
    const {getAllByTestId} = render(
      <ProductsList
        category={category}
        data={dataWithMultipleProducts}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />,
    );

    const itemSeparators = getAllByTestId('itemSeparator');
    expect(itemSeparators.length).toBe(dataWithMultipleProducts.length - 1);
  });

  it('extracts the correct keys from items', () => {
    const {getByTestId} = render(
      <ProductsList
        category={category}
        data={dataWithMultipleProducts}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />,
    );

    const flatList = getByTestId('flatList');
    expect(flatList.props.keyExtractor(dataWithMultipleProducts[0])).toBe(
      dataWithMultipleProducts[0].id.toString(),
    );
    expect(flatList.props.keyExtractor(dataWithMultipleProducts[1])).toBe(
      dataWithMultipleProducts[1].id.toString(),
    );
  });

  it('applies active category content container styles', () => {
    const style = {borderWidth: 1};
    const {getByTestId} = render(
      <ProductsList
        contentContainerStyle={style}
        category={category}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        activeCategory={category}
      />,
    );

    const contentContainer = getByTestId('flatList');

    expect(contentContainer).toHaveProperty('props.contentContainerStyle', [
      style,
      {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'space-between',
      },
    ]);
  });

  it('does not apply active category content container styles when not active', () => {
    const {getByTestId} = render(
      <ProductsList
        category={category}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        activeCategory="Category 2"
      />,
    );

    const contentContainer = getByTestId('flatList');

    expect(contentContainer).not.toHaveProperty('props.style', {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
      justifyContent: 'space-between',
    });
  });

  it('renders the item separator with the correct styles', () => {
    const {getByTestId} = render(
      <ProductsList
        category={category}
        data={dataWithMultipleProducts}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />,
    );

    const itemSeparator = getByTestId('itemSeparator');

    expect(itemSeparator).toHaveProperty('props.style', {
      width: theme.spacing.md,
    });
  });

  it('renders the ListEmptyComponent when data is empty', () => {
    const {getByTestId} = render(
      <ProductsList
        category={category}
        data={[]}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />,
    );

    expect(getByTestId('emptyComponent')).toBeTruthy();
  });
});
