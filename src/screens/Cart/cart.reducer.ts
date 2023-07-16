import {CartActions, CartState, CART_ACTION_TYPES} from './cart.action';

const initialState: CartState = {
  loading: false,
  items: [],
  totalAmount: 0,
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
      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case CART_ACTION_TYPES.CART_BUY:
      return {
        ...state,
        items: [],
        totalAmount: 0,
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
      return {
        ...state,
        items: updatedItems1,
        totalAmount: updatedTotalAmount1,
      };
    case CART_ACTION_TYPES.CART_DELETE_ALL:
      return {
        ...state,
        items: [],
        totalAmount: 0,
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
