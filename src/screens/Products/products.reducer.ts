import {
  ProductsActions,
  ProductsState,
  PRODUCTS_ACTION_TYPES,
} from './products.action';

const initialState: ProductsState = {
  loading: false,
  products: [],
  categories: [],
  productsByCategories: {},
};

export default (state = initialState, action: ProductsActions) => {
  switch (action.type) {
    case PRODUCTS_ACTION_TYPES.PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCTS_ACTION_TYPES.PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case PRODUCTS_ACTION_TYPES.PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case PRODUCTS_ACTION_TYPES.PRODUCT_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCTS_ACTION_TYPES.PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case PRODUCTS_ACTION_TYPES.PRODUCT_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case PRODUCTS_ACTION_TYPES.PRODUCTS_BY_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCTS_ACTION_TYPES.PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        productsByCategories: {
          ...state.productsByCategories,
          [action.payload.category]: action.payload.products,
        },
        loading: false,
      };
    case PRODUCTS_ACTION_TYPES.SET_LOADING:
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
