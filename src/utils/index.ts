import {AnyAction} from 'redux';
import {CartProduct} from 'screens/Cart/cart';
import {
  CART_ACTION_TYPES,
  CartAddAction,
  CartDeleteSingleAction,
} from 'screens/Cart/cart.action';

export interface IGenericAction {
  <T extends {type?: any; payload?: any}>({type, payload}: T): AnyAction;
}

export const GenericActionCreator: IGenericAction = ({
  type,
  payload,
}): AnyAction => ({
  type,
  payload,
});

export const emailValidator = (email: string): string => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) {
    return 'Email cannot be empty.';
  }
  if (!re.test(email)) {
    return 'Ooops! We need a valid email address.';
  }

  return '';
};

export const passwordValidator = (password: string): string => {
  if (!password || password.length <= 0) {
    return 'Password cannot be empty.';
  }

  return '';
};

export const toFixedNumber = (
  num: number,
  digits: number,
  base?: number,
): number => {
  const pow = Math.pow(base ?? 10, digits);
  return Math.round(num * pow) / pow;
};

export const calculateTotalAmount = (
  totalAmount: number,
  price: number,
  action: CartAddAction | CartDeleteSingleAction,
): number => {
  if (action.type === CART_ACTION_TYPES.CART_ADD) {
    return toFixedNumber(totalAmount + price, 2);
  } else {
    return toFixedNumber(totalAmount - price, 2);
  }
};

export const getExistingCartItemAndIndex = (
  items: CartProduct[],
  payloadId: number,
): {existingCartItem: CartProduct; existingCartItemIndex: number} => {
  const existingCartItemIndex = items.findIndex(item => item.id === payloadId);
  const existingCartItem = items[existingCartItemIndex];

  return {existingCartItem, existingCartItemIndex};
};
