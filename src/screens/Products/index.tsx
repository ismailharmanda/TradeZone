import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalState} from 'store/reducers';
import {ProductsState, PRODUCTS_ACTION_TYPES} from './products.action';
import {GenericActionCreator} from 'utils';
import {ScrollableContentContainer} from 'common/ScrollableContainer';
import {ProductsList} from 'components/ProductList';
import {theme} from 'theme';
import {ProductCard} from 'components/ProductCard';
import {CategoriesList} from 'components/CategoriesList';
import {CategoryBadge} from 'components/CategoryBadge';

export const ProductsScreen = () => {
  const dispatch = useDispatch();

  const [activeCategory, setActiveCategory] = useState<string>('' as string);

  const productsState = useSelector<GlobalState, ProductsState>(
    state => state.PRODUCTS,
  );

  const toggleCategory = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory('' as string);
    } else {
      setActiveCategory(category);
    }
  };

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

  const renderCategory = ({item}: {item: any}) => (
    <CategoryBadge
      item={item}
      onPress={toggleCategory}
      activeCategory={activeCategory}
    />
  );

  return (
    <ScrollableContentContainer contentContainerStyle={styles.contentContainer}>
      <View>
        <CategoriesList
          data={productsState.categories}
          renderItem={renderCategory}
          ListEmptyComponent={<ActivityIndicator />}
        />
      </View>
      {productsState.categories?.map(category => (
        <ProductsList
          activeCategory={activeCategory}
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
  contentContainer: {
    gap: theme.spacing.lg,
  },
});
