import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import {CategoryBadge} from 'components/CategoryBadge';

describe('CategoryBadge', () => {
  it('renders the component correctly', () => {
    const onPress = jest.fn();
    const activeCategory = 'Category 1';
    const item = 'Category 1';
    const {toJSON} = render(
      <CategoryBadge
        onPress={onPress}
        activeCategory={activeCategory}
        item={item}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders the CategoryBadge component', () => {
    const onPress = jest.fn();
    const activeCategory = 'Category 1';
    const item = 'Category 1';
    const {getByTestId} = render(
      <CategoryBadge
        onPress={onPress}
        activeCategory={activeCategory}
        item={item}
      />,
    );

    expect(getByTestId('categoryBadge')).toBeTruthy();
  });

  it('calls the onPress callback when the badge is pressed', () => {
    const onPress = jest.fn();
    const activeCategory = 'Category 1';
    const item = 'Category 1';
    const {getByTestId} = render(
      <CategoryBadge
        onPress={onPress}
        activeCategory={activeCategory}
        item={item}
      />,
    );

    const badge = getByTestId('categoryBadge');
    fireEvent.press(badge);

    expect(onPress).toHaveBeenCalledWith(item);
  });

  it('renders the correct text content', () => {
    const onPress = jest.fn();
    const activeCategory = 'Category 1';
    const item = 'Category 1';
    const {getByText} = render(
      <CategoryBadge
        onPress={onPress}
        activeCategory={activeCategory}
        item={item}
      />,
    );

    expect(getByText(item)).toBeTruthy();
  });
});
