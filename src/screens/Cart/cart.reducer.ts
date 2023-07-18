import {toFixedNumber} from 'utils';
import {CartActions, CartState, CART_ACTION_TYPES} from './cart.action';
import {
  calculateTotalAmount,
  getUpdatedItemsAfterCartAddAction,
  getUpdatedItemsAfterCartDeleteAllAction,
  getUpdatedItemsAfterCartDeleteSingleAction,
} from './cartUtils';

const initialState: CartState = {
  loading: false,
  items: [],
  totalAmount: 0,
  summary: 0,
  totalDiscount: 0,
  totalByCategory: {},
  discountedCategories: {
    electronics: {
      minTotal: 1000,
      discount: 0.05,
    },
    jewelery: {
      minTotal: 750,
      discount: 0.15,
    },
  },
};

export default (state = initialState, action: CartActions) => {
  switch (action.type) {
    case CART_ACTION_TYPES.CART_ADD:
      const updatedTotalAmount = calculateTotalAmount(
        state.totalAmount,
        action.payload.price,
        action,
      );
      const {updatedItems, updatedTotalByCategory} =
        getUpdatedItemsAfterCartAddAction(state, action);

      const totalDiscount = Object.values(updatedTotalByCategory).reduce(
        (acc, curr) => acc + curr.discountAmount,
        0,
      );

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        summary: toFixedNumber(updatedTotalAmount - totalDiscount, 2),
        totalDiscount: toFixedNumber(totalDiscount, 2),
        totalByCategory: updatedTotalByCategory,
      };
    case CART_ACTION_TYPES.CART_BUY:
      return {
        ...state,
        items: [],
        totalAmount: 0,
        summary: 0,
        totalDiscount: 0,
      };
    case CART_ACTION_TYPES.CART_DELETE_SINGLE:
      const updatedTotalAmount1 = calculateTotalAmount(
        state.totalAmount,
        action.payload.price,
        action,
      );

      const {
        updatedItems: updatedItems1,
        updatedTotalByCategory: updatedTotalByCategory1,
      } = getUpdatedItemsAfterCartDeleteSingleAction(state, action);
      const totalDiscount1 = Object.values(updatedTotalByCategory1).reduce(
        (acc, curr) => acc + curr.discountAmount,
        0,
      );
      return {
        ...state,
        items: updatedItems1,
        totalAmount: toFixedNumber(updatedTotalAmount1, 2),
        summary: toFixedNumber(updatedTotalAmount1 - totalDiscount1, 2),
        totalByCategory: updatedTotalByCategory1,
        totalDiscount: toFixedNumber(totalDiscount1, 2),
      };
    case CART_ACTION_TYPES.CART_DELETE_ALL:
      const existingCartItemIndex2 = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      const existingCartItem2 = state.items[existingCartItemIndex2];
      const updatedTotalAmount2 =
        state.totalAmount -
        existingCartItem2.price * existingCartItem2.quantity;

      const {
        updatedItems: updatedItems2,
        updatedTotalByCategory: updatedTotalByCategory2,
      } = getUpdatedItemsAfterCartDeleteAllAction(state, action);

      const totalDiscount2 = Object.values(updatedTotalByCategory2).reduce(
        (acc, curr) => acc + curr.discountAmount,
        0,
      );
      return {
        ...state,
        items: updatedItems2,
        totalAmount: toFixedNumber(updatedTotalAmount2, 2),
        summary: toFixedNumber(updatedTotalAmount2 - totalDiscount2, 2),
        totalByCategory: updatedTotalByCategory2,
        totalDiscount: toFixedNumber(totalDiscount2, 2),
      };
    case CART_ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
