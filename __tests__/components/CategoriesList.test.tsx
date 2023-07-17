/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import {View, Text} from 'react-native';
import {render} from 'react-native-testing-library';
import {CategoriesList} from 'components/CategoriesList';

describe('CategoriesList', () => {
  const data = ['Category 1', 'Category 2', 'Category 3'];
  const renderItem = jest.fn();
  const ListEmptyComponent = <View testID="emptyComponent" />;
  const contentContainerStyle = {marginTop: 10};
  const listStyle = {backgroundColor: 'red'};

  it('renders the component correctly', () => {
    const {toJSON} = render(
      <CategoriesList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={contentContainerStyle}
        listStyle={listStyle}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders component correctly', () => {
    const {getByTestId} = render(
      <CategoriesList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={contentContainerStyle}
        listStyle={listStyle}
      />,
    );

    expect(getByTestId('categoriesList')).toBeDefined();
    expect(getByTestId('flatList')).toBeDefined();
    expect(renderItem).toHaveBeenCalled();
  });

  it('renders the empty component when data is empty', () => {
    const {getByTestId} = render(
      <CategoriesList
        data={[]}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={contentContainerStyle}
        listStyle={listStyle}
      />,
    );

    expect(getByTestId('emptyComponent')).toBeDefined();
  });

  it('renders the CategoriesList component', () => {
    const data = ['Category 1', 'Category 2', 'Category 3'];
    const renderItem = jest.fn();
    const ListEmptyComponent = <View testID="emptyComponent" />;
    const {getByTestId} = render(
      <CategoriesList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />,
    );

    expect(getByTestId('categoriesList')).toBeTruthy();
  });

  it('renders the FlatList component', () => {
    const data = ['Category 1', 'Category 2', 'Category 3'];
    const renderItem = jest.fn();
    const ListEmptyComponent = <View testID="emptyComponent" />;
    const {getByTestId} = render(
      <CategoriesList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />,
    );

    expect(getByTestId('flatList')).toBeTruthy();
  });

  it('renders the items correctly within the FlatList', () => {
    const data = ['Category 1', 'Category 2', 'Category 3'];
    const renderItem = jest.fn(({item}) => <Text>{item}</Text>);
    const ListEmptyComponent = <View testID="emptyComponent" />;
    const {getByText} = render(
      <CategoriesList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />,
    );

    expect(getByText('Category 1')).toBeTruthy();
    expect(getByText('Category 2')).toBeTruthy();
    expect(getByText('Category 3')).toBeTruthy();
  });

  it('renders the ListEmptyComponent when data is empty', () => {
    const renderItem = jest.fn();
    const ListEmptyComponent = (
      <Text testID="emptyText">No categories found</Text>
    );
    const {getByTestId} = render(
      <CategoriesList
        data={[]}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />,
    );

    expect(getByTestId('emptyText')).toBeTruthy();
  });

  it('enables horizontal scrolling in the FlatList', () => {
    const data = ['Category 1', 'Category 2', 'Category 3'];
    const renderItem = jest.fn();
    const ListEmptyComponent = <View testID="emptyComponent" />;
    const {getByTestId} = render(
      <CategoriesList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />,
    );

    expect(getByTestId('flatList').props.horizontal).toBe(true);
  });

  it('renders the ItemSeparatorComponent between items', () => {
    const data = ['Category 1', 'Category 2', 'Category 3'];
    const renderItem = jest.fn();
    const ListEmptyComponent = <View testID="emptyComponent" />;
    const {getAllByTestId} = render(
      <CategoriesList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />,
    );

    const itemSeparators = getAllByTestId('itemSeparator');
    expect(itemSeparators.length).toBe(data.length - 1);
  });

  it('extracts the correct keys from items', () => {
    const data = ['Category 1', 'Category 2', 'Category 3'];
    const renderItem = jest.fn();
    const ListEmptyComponent = <View testID="emptyComponent" />;
    const {getByTestId} = render(
      <CategoriesList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />,
    );

    const flatList = getByTestId('flatList');
    expect(flatList.props.keyExtractor(data[0])).toBe(data[0]);
    expect(flatList.props.keyExtractor(data[1])).toBe(data[1]);
    expect(flatList.props.keyExtractor(data[2])).toBe(data[2]);
  });

  it('applies the custom contentContainerStyle', () => {
    const data = ['Category 1', 'Category 2', 'Category 3'];
    const renderItem = jest.fn();
    const ListEmptyComponent = <View testID="emptyComponent" />;
    const contentContainerStyle = {paddingHorizontal: 10};
    const {getByTestId} = render(
      <CategoriesList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={contentContainerStyle}
      />,
    );

    expect(getByTestId('flatList').props.contentContainerStyle).toEqual(
      contentContainerStyle,
    );
  });
});
