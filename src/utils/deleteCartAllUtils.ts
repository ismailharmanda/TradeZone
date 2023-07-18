import {toFixedNumber} from 'utils';
import {CartState, CartDeleteAllAction} from 'screens/Cart/cart.action';
import {Product} from 'screens/Products/products';

type updatedTotalByCategoryType = {
  [key: string]: {
    total: number;
    summary: number;
    discountAmount: number;
    percentage: number;
  };
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
