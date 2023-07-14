import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalState} from 'store/reducers';
import {ProductsState, PRODUCTS_ACTION_TYPES} from './products.action';
import {GenericActionCreator} from 'utils';

export const ProductsScreen = () => {
  const dispatch = useDispatch();

  const productsState = useSelector<GlobalState, ProductsState>(
    state => state.PRODUCTS,
  );
  console.log('productsState', productsState);

  useEffect(() => {
    dispatch(
      GenericActionCreator({type: PRODUCTS_ACTION_TYPES.PRODUCTS_REQUEST}),
    );
  }, [dispatch]);

  return (
    <View>
      <Text>Products Screen</Text>
    </View>
  );
};