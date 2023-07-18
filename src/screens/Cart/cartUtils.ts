import {toFixedNumber} from 'utils';
import {
  CartState,
  CartAddAction,
  CartDeleteAllAction,
  CartDeleteSingleAction,
  CART_ACTION_TYPES,
} from 'screens/Cart/cart.action';
import {Product} from 'screens/Products/products';
import {CartProduct} from 'screens/Cart/cart';

type updatedTotalByCategoryType = {
  [key: string]: {
    total: number;
    summary: number;
    discountAmount: number;
    percentage: number;
  };
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

const getExistingCartItemAndIndex = (
  items: CartProduct[],
  payloadId: number,
): {existingCartItem: CartProduct; existingCartItemIndex: number} => {
  const existingCartItemIndex = items.findIndex(item => item.id === payloadId);
  const existingCartItem = items[existingCartItemIndex];

  return {existingCartItem, existingCartItemIndex};
};

export const getUpdatedItemsAfterCartAddAction = (
  state: CartState,
  action: CartAddAction,
): {
  updatedItems: Product[];
  updatedTotalByCategory: updatedTotalByCategoryType;
} => {
  const {existingCartItem, existingCartItemIndex} = getExistingCartItemAndIndex(
    state.items,
    action.payload.id,
  );
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

  const updatedTotalByCategory: updatedTotalByCategoryType = {};

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
        discountAmount: toFixedNumber(
          toFixedNumber(
            (updatedTotalByCategory[item.category]?.total || 0) +
              item.price * item.quantity,
            2,
          ) -
            toFixedNumber(
              (updatedTotalByCategory[item.category]?.summary || 0) +
                item.price * item.quantity,
              2,
            ),
          2,
        ),
        percentage: state.discountedCategories[item.category]?.discount || 0,
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
        updatedTotalByCategory[item.category].discountAmount = toFixedNumber(
          updatedTotalByCategory[item.category].total *
            state.discountedCategories[item.category].discount,
          2,
        );
      }
    } else {
      updatedTotalByCategory[item.category] = {
        total: toFixedNumber(item.price * item.quantity, 2),
        summary: toFixedNumber(item.price * item.quantity, 2),
        discountAmount: 0,
        percentage: state.discountedCategories[item.category]?.discount || 0,
      };
    }
  });

  return {updatedItems, updatedTotalByCategory};
};

export const getUpdatedItemsAfterCartDeleteAllAction = (
  state: CartState,
  action: CartDeleteAllAction,
): {
  updatedItems: Product[];
  updatedTotalByCategory: updatedTotalByCategoryType;
} => {
  let updatedItems = state.items.filter(item => item.id !== action.payload.id);

  const updatedTotalByCategory: updatedTotalByCategoryType = {};

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
        discountAmount: toFixedNumber(
          toFixedNumber(
            (updatedTotalByCategory[item.category]?.total || 0) +
              item.price * item.quantity,
            2,
          ) -
            toFixedNumber(
              (updatedTotalByCategory[item.category]?.summary || 0) +
                item.price * item.quantity,
              2,
            ),
          2,
        ),
        percentage: state.discountedCategories[item.category]?.discount || 0,
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
        updatedTotalByCategory[item.category].discountAmount = toFixedNumber(
          updatedTotalByCategory[item.category].total *
            state.discountedCategories[item.category].discount,
          2,
        );
      }
    } else {
      updatedTotalByCategory[item.category] = {
        total: toFixedNumber(item.price * item.quantity, 2),
        summary: toFixedNumber(item.price * item.quantity, 2),
        discountAmount: 0,
        percentage: state.discountedCategories[item.category]?.discount || 0,
      };
    }
  });

  return {updatedItems, updatedTotalByCategory};
};

export const getUpdatedItemsAfterCartDeleteSingleAction = (
  state: CartState,
  action: CartDeleteSingleAction,
): {
  updatedItems: Product[];
  updatedTotalByCategory: updatedTotalByCategoryType;
} => {
  const {existingCartItem, existingCartItemIndex} = getExistingCartItemAndIndex(
    state.items,
    action.payload.id,
  );
  let updatedItems;
  if (existingCartItem.quantity > 1) {
    const updatedItem = {
      ...existingCartItem,
      quantity: existingCartItem.quantity - 1,
    };
    updatedItems = [...state.items];
    updatedItems[existingCartItemIndex] = updatedItem;
  } else {
    updatedItems = state.items.filter(item => item.id !== action.payload.id);
  }

  const updatedTotalByCategory: updatedTotalByCategoryType = {};

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
        discountAmount: toFixedNumber(
          toFixedNumber(
            (updatedTotalByCategory[item.category]?.total || 0) +
              item.price * item.quantity,
            2,
          ) -
            toFixedNumber(
              (updatedTotalByCategory[item.category]?.summary || 0) +
                item.price * item.quantity,
              2,
            ),
          2,
        ),
        percentage: state.discountedCategories[item.category]?.discount || 0,
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
        updatedTotalByCategory[item.category].discountAmount = toFixedNumber(
          updatedTotalByCategory[item.category].total *
            state.discountedCategories[item.category].discount,
          2,
        );
      }
    } else {
      updatedTotalByCategory[item.category] = {
        total: toFixedNumber(item.price * item.quantity, 2),
        summary: toFixedNumber(item.price * item.quantity, 2),
        discountAmount: 0,
        percentage: state.discountedCategories[item.category]?.discount || 0,
      };
    }
  });

  return {updatedItems, updatedTotalByCategory};
};
