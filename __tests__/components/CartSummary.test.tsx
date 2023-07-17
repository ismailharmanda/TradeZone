import React from 'react';
import {render} from 'react-native-testing-library';
import {CartSummary} from 'components/CartSummary';

describe('CartSummary', () => {
  it('renders correctly', () => {
    const subTotal = 100;
    const {toJSON} = render(
      <CartSummary subTotal={subTotal} discounts={{}} summary={0} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders the subTotal', () => {
    const subTotal = 100;
    const {getByText} = render(
      <CartSummary subTotal={subTotal} discounts={{}} summary={0} />,
    );
    expect(getByText(`Sub Total: ${subTotal} TL`)).toBeTruthy();
  });

  it('renders discounts', () => {
    const discounts = {
      category1: {
        total: 200,
        summary: 150,
        discountAmount: 50,
        percentage: 0.25,
      },
      category2: {
        total: 300,
        summary: 250,
        discountAmount: 50,
        percentage: 0.167,
      },
    };
    const {getByText} = render(
      <CartSummary subTotal={0} discounts={discounts} summary={0} />,
    );

    expect(getByText('Discounts:')).toBeTruthy();
    expect(getByText('category1 Category 25% - 50 TL')).toBeTruthy();
    expect(getByText('category2 Category 16.7% - 50 TL')).toBeTruthy();
  });

  it('renders the summary', () => {
    const summary = 250;
    const {getByText} = render(
      <CartSummary subTotal={0} discounts={{}} summary={summary} />,
    );
    expect(getByText(`Summary: ${summary} TL`)).toBeTruthy();
  });

  it('does not render discounts when the discounts object is empty', () => {
    const {queryByText} = render(
      <CartSummary subTotal={0} discounts={{}} summary={0} />,
    );
    expect(queryByText('Discounts:')).toBeNull();
  });

  it('does not render discounts with a discountAmount of 0', () => {
    const discounts = {
      category1: {
        total: 200,
        summary: 150,
        discountAmount: 0,
        percentage: 0.0,
      },
    };
    const {queryByText} = render(
      <CartSummary subTotal={0} discounts={discounts} summary={0} />,
    );
    expect(queryByText('category1 Category 0% - 0 TL')).toBeNull();
  });

  it('renders the correct discount categories', () => {
    const discounts = {
      category1: {
        total: 200,
        summary: 150,
        discountAmount: 50,
        percentage: 0.25,
      },
      category2: {
        total: 300,
        summary: 250,
        discountAmount: 50,
        percentage: 0.167,
      },
    };
    const {getByText} = render(
      <CartSummary subTotal={0} discounts={discounts} summary={0} />,
    );

    expect(getByText('category1 Category 25% - 50 TL')).toBeTruthy();
    expect(getByText('category2 Category 16.7% - 50 TL')).toBeTruthy();
  });
});
