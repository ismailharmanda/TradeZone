import {
  ProductDetailActions,
  ProductDetailState,
  PRODUCT_DETAIL_ACTION_TYPES,
} from './productDetail.action';

const initialState: ProductDetailState = {
  loading: false,
  product: undefined,
};

export default (state = initialState, action: ProductDetailActions) => {
  switch (action.type) {
    case PRODUCT_DETAIL_ACTION_TYPES.PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAIL_ACTION_TYPES.PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case PRODUCT_DETAIL_ACTION_TYPES.PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case PRODUCT_DETAIL_ACTION_TYPES.SET_LOADING:
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
