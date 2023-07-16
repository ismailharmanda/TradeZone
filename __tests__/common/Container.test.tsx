import React from 'react';
import {Text} from 'react-native';
import renderer from 'react-test-renderer';
import {Container} from 'common/Container';

describe('Container component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Container />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders children', () => {
    const TestComponent = () => <Text>Test</Text>;
    const component = renderer.create(
      <Container>
        <TestComponent />
      </Container>,
    );
    const testComponentInstance = component.root.findByType(TestComponent);
    expect(testComponentInstance).toBeDefined();
  });

  it('shows the logo when withLogo prop is true', () => {
    const component = renderer.create(<Container withLogo={true} />);
    const logoInstance = component.root.findByProps({testID: 'logo'});
    expect(logoInstance).toBeDefined();
  });
});
