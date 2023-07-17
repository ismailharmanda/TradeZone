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
import {TextInput} from 'common/TextInput';
import {Product} from './products';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'navigation/navigationService';
import {LoadingIndicator} from 'common/LoadingIndicator';

type Props = NativeStackScreenProps<RootStackParamList, any>;

export const ProductsScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch();
  const {productId, title} = route?.params || {};
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  const [visibleProducts, setVisibleProducts] = useState<{
    [key: string]: boolean;
  }>({
    productsByCategory: true,
    productsBySearch: false,
  });

  useEffect(() => {
    if (productId && title) {
      navigation.navigate('ProductDetailScreen', {
        productId,
        title,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const toggleVisibleProducts = (key: string) => {
    setVisibleProducts({
      productsByCategory: false,
      productsBySearch: false,
      [key]: true,
    });
  };

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const productsState = useSelector<GlobalState, ProductsState>(
    state => state.PRODUCTS,
  );

  const toggleCategory = (category: string) => {
    setSearchText('');
    toggleVisibleProducts('productsByCategory');
    if (activeCategory === category) {
      setActiveCategory('' as string);
    } else {
      setActiveCategory(category);
    }
  };

  useEffect(() => {
    dispatch(
      GenericActionCreator({
        type: PRODUCTS_ACTION_TYPES.PRODUCTS_REQUEST,
      }),
    );
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

  const renderItem = ({item}: {item: any}) => (
    <ProductCard
      onPress={() => {
        navigation.navigate('ProductDetailScreen', {
          productId: item.id,
          title: item.title,
        });
      }}
      product={item}
    />
  );

  const renderCategory = ({item}: {item: any}) => (
    <CategoryBadge
      item={item}
      onPress={toggleCategory}
      activeCategory={activeCategory}
    />
  );

  const onSearch = (text: string) => {
    setSearchText(text);
    setActiveCategory('');
    if (text === '') {
      toggleVisibleProducts('productsByCategory');
    } else {
      toggleVisibleProducts('productsBySearch');
    }
    const productsBySearch = productsState.products.filter(product =>
      product.title.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredProducts(productsBySearch);
  };

  return (
    <ScrollableContentContainer contentContainerStyle={styles.contentContainer}>
      <View style={styles.filterContainer}>
        <TextInput
          value={searchText}
          onChangeText={onSearch}
          placeholder="Search a product or brand"
        />
        <CategoriesList
          data={productsState.categories}
          renderItem={renderCategory}
          ListEmptyComponent={<ActivityIndicator />}
        />
      </View>
      {productsState.categories?.map(category => (
        <ProductsList
          containerStyle={
            !visibleProducts.productsByCategory ? styles.hide : {}
          }
          activeCategory={activeCategory}
          key={category}
          data={productsState.productsByCategories[category]}
          category={category}
          renderItem={renderItem}
          ListEmptyComponent={<ActivityIndicator />}
        />
      ))}
      {filteredProducts.length > 0 && (
        <ProductsList
          vertical={true}
          containerStyle={!visibleProducts.productsBySearch ? styles.hide : {}}
          activeCategory={activeCategory}
          data={filteredProducts}
          renderItem={renderItem}
          ListEmptyComponent={<ActivityIndicator />}
        />
      )}
      <LoadingIndicator
        isLoading={productsState.loading}
        text={'Products are loading... '}
      />
    </ScrollableContentContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: theme.spacing.md,
  },
  hide: {display: 'none'},
  filterContainer: {width: '100%', gap: theme.spacing.sm},
});
