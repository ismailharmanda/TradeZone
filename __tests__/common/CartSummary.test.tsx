import React from 'react';
import {render} from 'react-native-testing-library';
import renderer from 'react-test-renderer';
import {CartSummary} from 'components/CartSummary';

describe('CartSummary', () => {
  const subTotal = 100;
  const discounts = {
    category1: {
      total: 90,
      summary: 10,
      discountAmount: 10,
      percentage: 0.1,
    },
    category2: {
      total: 80,
      summary: 20,
      discountAmount: 20,
      percentage: 0.2,
    },
    category3: {
      total: 70,
      summary: 30,
      discountAmount: 30,
      percentage: 0.3,
    },
  };
  const summary = 80;

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <CartSummary
          subTotal={subTotal}
          discounts={discounts}
          summary={summary}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the sub total correctly', () => {
    const {getByText} = render(
      <CartSummary
        subTotal={subTotal}
        discounts={discounts}
        summary={summary}
      />,
    );
    const subTotalText = getByText(`Sub Total: ${subTotal} TL`);
    expect(subTotalText).toBeDefined();
  });

  it('renders the discounts correctly', () => {
    const {getByText, queryByText} = render(
      <CartSummary
        subTotal={subTotal}
        discounts={discounts}
        summary={summary}
      />,
    );
    const discountTitle = getByText('Discounts:');
    expect(discountTitle).toBeDefined();

    const category1Text = getByText(
      `category1 Category ${discounts.category1.percentage * 100}% - ${
        discounts.category1.discountAmount
      } TL`,
    );
    expect(category1Text).toBeDefined();

    const category2Text = getByText(
      `category2 Category ${discounts.category2.percentage * 100}% - ${
        discounts.category2.discountAmount
      } TL`,
    );
    expect(category2Text).toBeDefined();

    const category3Text = queryByText(
      `category3 Category ${discounts.category3.percentage * 100}% - ${
        discounts.category3.discountAmount
      } TL`,
    );
    expect(category3Text).toBeDefined();
  });

  it('renders the summary correctly', () => {
    const {getByText} = render(
      <CartSummary
        subTotal={subTotal}
        discounts={discounts}
        summary={summary}
      />,
    );
    const summaryText = getByText(`Summary: ${summary} TL`);
    expect(summaryText).toBeDefined();
  });
});
