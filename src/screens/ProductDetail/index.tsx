import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalState} from 'store/reducers';
import {
  ProductDetailState,
  PRODUCT_DETAIL_ACTION_TYPES,
} from './productDetail.action';
import {GenericActionCreator} from 'utils';

export const ProductsScreen = () => {
  const dispatch = useDispatch();

  const productsState = useSelector<GlobalState, ProductDetailState>(
    state => state.PRODUCT_DETAIL,
  );
  console.log('productsState', productsState);

  useEffect(() => {
    dispatch(
      GenericActionCreator({
        type: PRODUCT_DETAIL_ACTION_TYPES.PRODUCT_DETAIL_REQUEST,
      }),
    );
  }, [dispatch]);

  return (
    <View>
      <Text>Products Screen</Text>
    </View>
  );
};
