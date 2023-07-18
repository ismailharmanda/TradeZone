/* eslint-disable @typescript-eslint/no-shadow */
import {
  GenericActionCreator,
  emailValidator,
  passwordValidator,
  toFixedNumber,
} from 'utils';
import {
  getExistingCartItemAndIndex,
  calculateTotalAmount,
} from 'screens/Cart/cartUtils';
import {CART_ACTION_TYPES, CartAddAction} from 'screens/Cart/cart.action';
import {CartDeleteSingleAction} from 'screens/Cart/cart.action';

describe('GenericActionCreator', () => {
  it('creates a generic action with type and payload', () => {
    const action = GenericActionCreator({
      type: 'ACTION_TYPE',
      payload: {key: 'value'},
    });
    expect(action.type).toBe('ACTION_TYPE');
    expect(action.payload).toEqual({key: 'value'});
  });
});

describe('emailValidator', () => {
  it('returns an error message when email is empty', () => {
    const errorMessage = emailValidator('');
    expect(errorMessage).toBe('Email cannot be empty.');
  });

  it('returns an error message when email is invalid', () => {
    const errorMessage = emailValidator('invalid-email');
    expect(errorMessage).toBe('Ooops! We need a valid email address.');
  });

  it('returns an empty string when email is valid', () => {
    const errorMessage = emailValidator('valid@example.com');
    expect(errorMessage).toBe('');
  });
});

describe('passwordValidator', () => {
  it('returns an error message when password is empty', () => {
    const errorMessage = passwordValidator('');
    expect(errorMessage).toBe('Password cannot be empty.');
  });

  it('returns an empty string when password is not empty', () => {
    const errorMessage = passwordValidator('password');
    expect(errorMessage).toBe('');
  });
});

describe('toFixedNumber', () => {
  it('returns the number with specified digits', () => {
    const result = toFixedNumber(3.14159, 2);
    expect(result).toBe(3.14);
  });

  it('returns the number with specified digits and base', () => {
    const result = toFixedNumber(3.14159, 2, 2);
    expect(result).toBe(3.25);
  });

  it('should use base 10 if no base is provided', () => {
    const num = 3.14159;
    const digits = 2;
    const result = toFixedNumber(num, digits);

    expect(result).toBe(3.14);
  });
});

describe('calculateTotalAmount', () => {
  const totalAmount = 100;
  const price = 10;

  const product = {
    id: 1,
    title: 'Product 1',
    price: 10,
    image: 'https://example.com/image.png',
    category: 'Category 1',
    description: 'Description 1',
    rating: {rate: 4.5, count: 10},
  };

  it('returns the correct total amount when adding an item', () => {
    const action: CartAddAction = {
      type: CART_ACTION_TYPES.CART_ADD,
      payload: product,
    };
    const result = calculateTotalAmount(totalAmount, price, action);

    expect(result).toBe(110);
  });

  it('returns the correct total amount when deleting a single item', () => {
    const product = {
      id: 1,
      title: 'Product 1',
      price: 10,
      image: 'https://example.com/image.png',
      category: 'Category 1',
      description: 'Description 1',
      rating: {rate: 4.5, count: 10},
    };
    const action: CartDeleteSingleAction = {
      type: CART_ACTION_TYPES.CART_DELETE_SINGLE,
      payload: product,
    };
    const result = calculateTotalAmount(totalAmount, price, action);

    expect(result).toBe(90);
  });
});

describe('getExistingCartItemAndIndex', () => {
  const items = [
    {
      id: 1,
      title: 'Product 1',
      price: 10,
      image: 'https://example.com/image.png',
      category: 'Category 1',
      description: 'Description 1',
      rating: {rate: 4.5, count: 10},
      quantity: 3,
    },
    {
      id: 2,
      title: 'Product 2',
      price: 20,
      image: 'https://example.com/image.png',
      category: 'Category 1',
      description: 'Description 1',
      rating: {rate: 4.5, count: 10},
      quantity: 2,
    },
    {
      id: 3,
      title: 'Product 3',
      price: 30,
      image: 'https://example.com/image.png',
      category: 'Category 1',
      description: 'Description 1',
      rating: {rate: 4.5, count: 10},
      quantity: 1,
    },
  ];

  it('returns the existing cart item and index when the item exists', () => {
    const payloadId = 2;
    const expectedIndex = 1;
    const expectedCartItem = items[expectedIndex];

    const result = getExistingCartItemAndIndex(items, payloadId);

    expect(result).toEqual({
      existingCartItem: expectedCartItem,
      existingCartItemIndex: expectedIndex,
    });
  });

  it('returns undefined for both cart item and index when the item does not exist', () => {
    const payloadId = 4;

    const result = getExistingCartItemAndIndex(items, payloadId);

    expect(result).toEqual({
      existingCartItem: undefined,
      existingCartItemIndex: -1,
    });
  });
});
