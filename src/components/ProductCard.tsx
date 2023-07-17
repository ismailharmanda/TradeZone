import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {theme} from 'theme';
import {Product} from 'screens/Products/products';

interface Props {
  onPress?: () => void;
  product: Product;
}

const HEIGHT = Dimensions.get('window').height;

export const ProductCard = ({onPress, product}: Props) => {
  return (
    <TouchableOpacity
      testID="productCard"
      style={styles.container}
      onPress={onPress}>
      <Image
        testID="productImage"
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: product.image,
        }}
      />
      <Text numberOfLines={1} style={styles.text}>
        {product.title}
      </Text>
      <Text style={styles.textPrice}>{product.price} TL</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radius,
    overflow: 'hidden',
    backgroundColor: theme.colors.secondary.transparent,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: HEIGHT / 6,
    height: HEIGHT / 4,
    borderWidth: 1,
    borderColor: theme.colors.secondary.regular,
  },
  image: {width: HEIGHT / 6, height: HEIGHT / 6},
  button: {
    width: '100%',
    height: theme.height.button,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius,
  },
  primary: {
    backgroundColor: theme.colors.primary.regular,
  },
  'primary-outline': {
    backgroundColor: theme.colors.base.white,
    borderWidth: 1,
    borderColor: theme.colors.primary.regular,
  },
  disabled: {
    backgroundColor: theme.colors.primary.transparent,
  },
  text: {
    fontWeight: 'bold',
    fontSize: theme.text.size.sm.fontSize,
    lineHeight: theme.text.size.sm.lineHeight,
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
});
