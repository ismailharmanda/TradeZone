import React from 'react';
import {render} from 'react-native-testing-library';
import renderer from 'react-test-renderer';
import {LoadingIndicator} from 'common/LoadingIndicator';

describe('LoadingIndicator', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<LoadingIndicator isLoading={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the loading indicator when isLoading is true', () => {
    const {getByTestId} = render(<LoadingIndicator isLoading={true} />);
    const loadingIndicator = getByTestId('loading-indicator');
    expect(loadingIndicator).toBeDefined();
  });

  it('renders the custom text correctly', () => {
    const customText = 'Custom Loading...';
    const {getByText} = render(
      <LoadingIndicator isLoading={true} text={customText} />,
    );
    const textElement = getByText(customText);
    expect(textElement).toBeDefined();
  });
});
