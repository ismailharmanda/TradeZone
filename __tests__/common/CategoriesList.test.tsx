import React from 'react';
import {View} from 'react-native';
import {render} from 'react-native-testing-library';
import renderer from 'react-test-renderer';

import {CategoriesList} from 'components/CategoriesList';

describe('CategoriesList', () => {
  const data = ['Category 1', 'Category 2', 'Category 3'];
  const renderItem = jest.fn();
  const ListEmptyComponent = <View testID="emptyComponent" />;
  const contentContainerStyle = {marginTop: 10};
  const listStyle = {backgroundColor: 'red'};

  it('renders the component correctly', () => {
    const component = renderer.create(
      <CategoriesList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={contentContainerStyle}
        listStyle={listStyle}
      />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the component correctly', () => {
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
});
