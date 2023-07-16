import {Text, ScrollView, StyleSheet} from 'react-native';
import {theme} from 'theme';
import {CartItem} from 'components/CartItem';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalState} from 'store/reducers';
import {CartState, CART_ACTION_TYPES} from 'screens/Cart/cart.action';
import {GenericActionCreator} from 'utils';
import {CartProduct} from './cart';

export const CartScreen = () => {
  const dispatch = useDispatch();

  const cartState = useSelector<GlobalState, CartState>(state => state.CART);

  const onPlusPress = (product: CartProduct) => {
    dispatch(
      GenericActionCreator({
        type: CART_ACTION_TYPES.CART_ADD,
        payload: product,
      }),
    );
  };
  const onMinusPress = (product: CartProduct) => {
    dispatch(
      GenericActionCreator({
        type: CART_ACTION_TYPES.CART_DELETE_SINGLE,
        payload: product,
      }),
    );
  };

  const onDelete = (product: CartProduct) => {
    dispatch(
      GenericActionCreator({
        type: CART_ACTION_TYPES.CART_DELETE_ALL,
        payload: product,
      }),
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {cartState.items.map(item => (
        <CartItem
          onMinusPress={onMinusPress}
          onPlusPress={onPlusPress}
          onDelete={onDelete}
          key={item.id}
          product={item}
        />
      ))}
      <Text>{cartState.totalAmount.toFixed(2)} TL</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: theme.spacing.screenHorizontalPadding,
    backgroundColor: theme.colors.base.white,
    gap: theme.spacing.md,
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: theme.spacing.screenVerticalPadding,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
