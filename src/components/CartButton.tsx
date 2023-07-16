import {TouchableOpacity} from 'react-native';
import {theme} from 'theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

export const CartButton = () => {
  const navigation = useNavigation();

  const onCartPress = () => {
    navigation.navigate('CartStack');
  };

  return (
    <TouchableOpacity onPress={onCartPress}>
      <MaterialCommunityIcons
        name="cart"
        size={26}
        color={theme.colors.primary.regular}
      />
    </TouchableOpacity>
  );
};
