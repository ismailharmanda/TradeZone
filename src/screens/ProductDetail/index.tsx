import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalState} from 'store/reducers';
import {
  ProductDetailState,
  PRODUCT_DETAIL_ACTION_TYPES,
} from './productDetail.action';
import {GenericActionCreator} from 'utils';

export const ProductDetailScreen = () => {
  const dispatch = useDispatch();

  const productDetailState = useSelector<GlobalState, ProductDetailState>(
    state => state.PRODUCT_DETAIL,
  );
  console.log('productDetailState', productDetailState);

  useEffect(() => {
    dispatch(
      GenericActionCreator({
        type: PRODUCT_DETAIL_ACTION_TYPES.PRODUCT_DETAIL_REQUEST,
        payload: 1,
      }),
    );
  }, [dispatch]);

  return (
    <View>
      <Text>Product Detail Screen</Text>
    </View>
  );
};
