import {SCREENS} from 'config/screens';

export interface RootStackParamList {
  ProductsStack: undefined;
  [SCREENS.LOGIN]: undefined;
  [SCREENS.PRODUCTS]: undefined;
  [SCREENS.PRODUCT_DETAIL]: {productId: Number};
  [SCREENS.PROFILE]: undefined;
  [SCREENS.CART]: undefined;
}
