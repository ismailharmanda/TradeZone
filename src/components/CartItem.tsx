import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  View,
} from 'react-native';
import {theme} from 'theme';
import {CartProduct} from 'screens/Cart/cart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {toFixedNumber} from 'utils';

interface Props {
  product: CartProduct;
  onPlusPress: (product: CartProduct) => void;
  onMinusPress: (product: CartProduct) => void;
  onDelete: (product: CartProduct) => void;
}

const HEIGHT = Dimensions.get('window').height;

export const CartItem = ({
  onPlusPress,
  onMinusPress,
  onDelete,
  product,
}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: product.image,
        }}
      />
      <View style={styles.textWrapper}>
        <Text numberOfLines={3} style={styles.textTitle}>
          {product.title}
        </Text>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.textPrice}>
          {product.price} × {product.quantity} ={' '}
          {toFixedNumber(product.price * product.quantity, 2)} TL
        </Text>
      </View>
      <View style={styles.calculatorWrapper}>
        <View style={styles.calculator}>
          <TouchableOpacity onPress={() => onMinusPress(product)}>
            <Text style={styles.calculatorButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.textQuantity}>{product.quantity}</Text>
          <TouchableOpacity onPress={() => onPlusPress(product)}>
            <Text style={styles.calculatorButton}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => onDelete(product)}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            color={theme.colors.base.dark}
            size={26}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: theme.radius,
    overflow: 'hidden',
    backgroundColor: theme.colors.secondary.transparent,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: HEIGHT / 7,
    borderWidth: 1,
    borderColor: theme.colors.secondary.regular,
    paddingHorizontal: theme.spacing.sm,
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
  },
  calculator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calculatorWrapper: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: '20%', height: '100%', flex: 1},
  button: {
    width: '100%',
    height: theme.height.button,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius,
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
    fontSize: theme.text.size.sm.fontSize,
    lineHeight: theme.text.size.sm.lineHeight,
    color: theme.colors.primary.regular,
    width: '100%',
    flexWrap: 'wrap',
  },
  textQuantity: {
    fontSize: theme.text.size.lg.fontSize,
  },
  textWrapper: {
    justifyContent: 'space-evenly',
    height: '100%',
    flex: 2,
  },
  calculatorButton: {
    fontSize: theme.text.size.lg.fontSize,
    lineHeight: theme.text.size.lg.lineHeight,
    fontWeight: 'bold',
    color: theme.colors.primary.regular,
    padding: theme.spacing.md,
  },
});
