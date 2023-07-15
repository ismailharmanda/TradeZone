import {ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalState} from 'store/reducers';
import {ProductsState, PRODUCTS_ACTION_TYPES} from './products.action';
import {GenericActionCreator} from 'utils';
import {ScrollableContentContainer} from 'common/ScrollableContainer';
import {ProductsList} from 'components/ProductList';
import {theme} from 'theme';
import {ProductCard} from 'components/ProductCard';

export const ProductsScreen = () => {
  const dispatch = useDispatch();

  const productsState = useSelector<GlobalState, ProductsState>(
    state => state.PRODUCTS,
  );
  console.log('productsState', productsState);

  useEffect(() => {
    dispatch(
      GenericActionCreator({
        type: PRODUCTS_ACTION_TYPES.PRODUCT_CATEGORIES_REQUEST,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    productsState.categories?.forEach(category => {
      dispatch(
        GenericActionCreator({
          type: PRODUCTS_ACTION_TYPES.PRODUCTS_BY_CATEGORY_REQUEST,
          payload: category,
        }),
      );
    });
  }, [productsState.categories, dispatch]);

  const renderItem = ({item}: {item: any}) => <ProductCard product={item} />;

  return (
    <ScrollableContentContainer contentContainerStyle={styles.contentContainer}>
      {productsState.categories?.map(category => (
        <ProductsList
          key={category}
          data={productsState.productsByCategories[category]}
          category={category}
          renderItem={renderItem}
          ListEmptyComponent={<ActivityIndicator />}
        />
      ))}
    </ScrollableContentContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {gap: theme.spacing.xxl},
});
