import React from 'react';
import {View, Text} from 'react-native';
import {render} from 'react-native-testing-library';
import {ScrollableContentContainer} from 'common/ScrollableContainer';
import renderer from 'react-test-renderer';

describe('ScrollableContentContainer', () => {
  const children = <View testID="child" />;
  const containerStyle = {backgroundColor: 'red'};
  const contentContainerStyle = {paddingHorizontal: 20};

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ScrollableContentContainer
          containerStyle={containerStyle}
          contentContainerStyle={contentContainerStyle}>
          {children}
        </ScrollableContentContainer>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders children correctly', () => {
    const {getByTestId} = render(
      <ScrollableContentContainer>
        <Text>Child 1</Text>
        <Text>Child 2</Text>
      </ScrollableContentContainer>,
    );

    expect(getByTestId('scrollableContentContainer')).toBeDefined();
  });

  it('renders the component correctly', () => {
    const {getByTestId} = render(
      <ScrollableContentContainer
        containerStyle={containerStyle}
        contentContainerStyle={contentContainerStyle}>
        {children}
      </ScrollableContentContainer>,
    );

    expect(getByTestId('scrollableContentContainer')).toBeDefined();
    expect(getByTestId('child')).toBeDefined();
  });
});
