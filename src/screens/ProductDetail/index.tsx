import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalState} from 'store/reducers';
import {
  ProductDetailState,
  PRODUCT_DETAIL_ACTION_TYPES,
} from './productDetail.action';
import {GenericActionCreator} from 'utils';
import {RouteProp} from '@react-navigation/native';

interface Props {
  route: RouteProp<any, any> | undefined;
}

export const ProductDetailScreen = ({route}: Props) => {
  const dispatch = useDispatch();

  const {productId} = route?.params || {};

  const productDetailState = useSelector<GlobalState, ProductDetailState>(
    state => state.PRODUCT_DETAIL,
  );
  console.log('productDetailState', productDetailState);

  useEffect(() => {
    if (productId == null || undefined) {
      return;
    }
    dispatch(
      GenericActionCreator({
        type: PRODUCT_DETAIL_ACTION_TYPES.PRODUCT_DETAIL_REQUEST,
        payload: productId,
      }),
    );
  }, [dispatch, productId]);

  return (
    <View>
      <Text>{productDetailState.product?.title}</Text>
    </View>
  );
};
