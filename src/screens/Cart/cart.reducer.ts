import {toFixedNumber} from 'utils';
import {CartActions, CartState, CART_ACTION_TYPES} from './cart.action';

const initialState: CartState = {
  loading: false,
  items: [],
  totalAmount: 0,
  summary: 0,
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
      const updatedTotalAmount = state.totalAmount + action.payload.price;
      const existingCartItemIndex = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = [
          ...state.items,
          {
            quantity: 1,
            ...action.payload,
          },
        ];
      }

      const updatedTotalByCategory: {
        [key: string]: {total: number; summary: number};
      } = {};

      updatedItems.forEach(item => {
        if (item.category in state.discountedCategories) {
          updatedTotalByCategory[item.category] = {
            total: toFixedNumber(
              (updatedTotalByCategory[item.category]?.total || 0) +
                item.price * item.quantity,
              2,
            ),
            summary: toFixedNumber(
              (updatedTotalByCategory[item.category]?.summary || 0) +
                item.price * item.quantity,
              2,
            ),
          };
          if (
            updatedTotalByCategory[item.category].total >=
            state.discountedCategories[item.category].minTotal
          ) {
            updatedTotalByCategory[item.category].summary = toFixedNumber(
              updatedTotalByCategory[item.category].total -
                updatedTotalByCategory[item.category].total *
                  state.discountedCategories[item.category].discount,
              2,
            );
          }
        } else {
          updatedTotalByCategory[item.category] = {
            total: toFixedNumber(item.price * item.quantity, 2),
            summary: toFixedNumber(item.price * item.quantity, 2),
          };
        }
      });

      return {
        ...state,
        items: updatedItems,
        totalAmount: toFixedNumber(updatedTotalAmount, 2),
        summary: toFixedNumber(updatedTotalAmount, 2),
        totalByCategory: updatedTotalByCategory,
      };
    case CART_ACTION_TYPES.CART_BUY:
      return {
        ...state,
        items: [],
        totalAmount: 0,
        summary: 0,
      };
    case CART_ACTION_TYPES.CART_DELETE_SINGLE:
      const existingCartItemIndex1 = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      const existingCartItem1 = state.items[existingCartItemIndex1];
      const updatedTotalAmount1 = state.totalAmount - existingCartItem1.price;
      let updatedItems1;
      if (existingCartItem1.quantity === 1) {
        updatedItems1 = state.items.filter(
          item => item.id !== action.payload.id,
        );
      } else {
        const updatedItem1 = {
          ...existingCartItem1,
          quantity: existingCartItem1.quantity - 1,
        };
        updatedItems1 = [...state.items];
        updatedItems1[existingCartItemIndex1] = updatedItem1;
      }

      const updatedTotalByCategory1: {
        [key: string]: {total: number; summary: number};
      } = {};

      updatedItems1.forEach(item => {
        if (item.category in state.discountedCategories) {
          updatedTotalByCategory1[item.category] = {
            total: toFixedNumber(
              (updatedTotalByCategory1[item.category]?.total || 0) +
                item.price * item.quantity,
              2,
            ),
            summary: toFixedNumber(
              (updatedTotalByCategory1[item.category]?.summary || 0) +
                item.price * item.quantity,
              2,
            ),
          };
          if (
            updatedTotalByCategory1[item.category].total >=
            state.discountedCategories[item.category].minTotal
          ) {
            updatedTotalByCategory1[item.category].summary = toFixedNumber(
              updatedTotalByCategory1[item.category].total -
                updatedTotalByCategory1[item.category].total *
                  state.discountedCategories[item.category].discount,
              2,
            );
          }
        } else {
          updatedTotalByCategory1[item.category] = {
            total: toFixedNumber(item.price * item.quantity, 2),
            summary: toFixedNumber(item.price * item.quantity, 2),
          };
        }
      });
      return {
        ...state,
        items: updatedItems1,
        totalAmount: toFixedNumber(updatedTotalAmount1, 2),
        summary: toFixedNumber(updatedTotalAmount1, 2),
        totalByCategory: updatedTotalByCategory1,
      };
    case CART_ACTION_TYPES.CART_DELETE_ALL:
      const existingCartItemIndex2 = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      const existingCartItem2 = state.items[existingCartItemIndex2];
      const updatedTotalAmount2 =
        state.totalAmount -
        existingCartItem2.price * existingCartItem2.quantity;
      let updatedItems2 = state.items.filter(
        item => item.id !== action.payload.id,
      );

      const updatedTotalByCategory2: {
        [key: string]: {total: number; summary: number};
      } = {};

      updatedItems2.forEach(item => {
        if (item.category in state.discountedCategories) {
          updatedTotalByCategory2[item.category] = {
            total:
              (updatedTotalByCategory2[item.category]?.total || 0) +
              item.price * item.quantity,
            summary:
              (updatedTotalByCategory2[item.category]?.summary || 0) +
              item.price * item.quantity,
          };
          if (
            updatedTotalByCategory2[item.category].total >=
            state.discountedCategories[item.category].minTotal
          ) {
            updatedTotalByCategory2[item.category].summary =
              updatedTotalByCategory2[item.category].total -
              updatedTotalByCategory2[item.category].total *
                state.discountedCategories[item.category].discount;
          }
        } else {
          updatedTotalByCategory2[item.category] = {
            total: item.price * item.quantity,
            summary: item.price * item.quantity,
          };
        }
      });
      return {
        ...state,
        items: updatedItems2,
        totalAmount: toFixedNumber(updatedTotalAmount2, 2),
        summary: toFixedNumber(updatedTotalAmount2, 2),
        totalByCategory: updatedTotalByCategory2,
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
