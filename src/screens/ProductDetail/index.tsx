import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalState} from 'store/reducers';
import {
  ProductDetailState,
  PRODUCT_DETAIL_ACTION_TYPES,
} from './productDetail.action';
import {GenericActionCreator} from 'utils';
import {RouteProp} from '@react-navigation/native';
import {theme} from 'theme';
import {Button} from 'common/Button';
import Toast from 'react-native-toast-message';

interface Props {
  route: RouteProp<any, any> | undefined;
}

const WIDTH = Dimensions.get('window').width;

const showToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Product added to cart',
    position: 'bottom',
    visibilityTime: 1000,
  });
};

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

  return productDetailState.loading ? (
    <Text>Loading...</Text>
  ) : (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: productDetailState?.product?.image,
        }}
      />
      <View style={styles.infoWrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.textTitle}>
            {productDetailState.product?.title}
          </Text>
          <Text style={styles.textPrice}>
            {productDetailState.product?.price} TL
          </Text>
        </View>
        <Button style={styles.button} text="Add To Cart" onPress={showToast} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.screenHorizontalPadding,
    backgroundColor: theme.colors.secondary.regular,
    flex: 1,
    gap: theme.spacing.md,
  },
  image: {
    width: WIDTH,
    height: WIDTH,
    backgroundColor: theme.colors.base.white,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: theme.text.size.xs.fontSize,
    lineHeight: theme.text.size.xs.lineHeight,
    color: theme.colors.base.dark,
    width: '100%',
    flexWrap: 'wrap',
  },
  textPrice: {
    fontWeight: 'bold',
    fontSize: theme.text.size.md.fontSize,
    lineHeight: theme.text.size.md.lineHeight,
    color: theme.colors.tertiary.regular,
    width: '100%',
    flexWrap: 'wrap',
  },
  infoWrapper: {flexDirection: 'row', alignItems: 'center'},
  textWrapper: {
    flex: 1,
  },
  button: {flex: 1},
});
