import React, {useMemo} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductsScreen} from 'screens/Products';
import {ProductDetailScreen} from 'screens/ProductDetail';
import {ProfileScreen} from 'screens/Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CartScreen} from 'screens/Cart';
import {RootStackParamList} from 'navigation/navigationService';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {theme} from 'theme';
import {CartButton} from 'components/CartButton';
import {useSelector} from 'react-redux';
import {GlobalState} from 'store/reducers';
import {CartState} from 'screens/Cart/cart.action';

type ProductDetailScreenProps = NativeStackScreenProps<RootStackParamList, any>;

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const UserNavigator = () => {
  const cartState = useSelector<GlobalState, CartState>(state => state.CART);
  const cartItemsCount = cartState.items.length;

  const ProductsStackScreen = useMemo(() => {
    return () => {
      return (
        <Stack.Navigator
          screenOptions={{
            headerTintColor: theme.colors.primary.regular,
          }}>
          <Stack.Screen
            name="ProductsScreen"
            options={{
              title: 'Products',
              headerRight: CartButton,
            }}
            component={ProductsScreen}
          />
          <Stack.Screen
            options={({route}: ProductDetailScreenProps) => ({
              title: route?.params?.title.split(' ').slice(0, 2).join(' '),
              headerRight: CartButton,
            })}
            name="ProductDetailScreen"
            component={ProductDetailScreen}
          />
        </Stack.Navigator>
      );
    };
  }, []);

  const ProfileStackScreen = useMemo(() => {
    return () => {
      return (
        <Stack.Navigator
          screenOptions={{
            headerTintColor: theme.colors.primary.regular,
            title: 'Profile',
          }}>
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
      );
    };
  }, []);

  const CartStackScreen = useMemo(() => {
    return () => {
      return (
        <Stack.Navigator
          screenOptions={{
            headerTintColor: theme.colors.primary.regular,
            title: 'Cart',
          }}>
          <Stack.Screen name="CartScreen" component={CartScreen} />
        </Stack.Navigator>
      );
    };
  }, []);

  return (
    <Tab.Navigator
      activeColor="#f0edf6"
      inactiveColor="#f0edf6"
      barStyle={{backgroundColor: '#F27919'}}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? '#F27919' : color}
              size={26}
            />
          ),
        }}
        name="ProductsStack"
        component={ProductsStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Cart',
          tabBarBadge: cartItemsCount,
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="cart"
              color={focused ? '#F27919' : color}
              size={26}
            />
          ),
        }}
        name="CartStack"
        component={CartStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="menu"
              color={focused ? '#F27919' : color}
              size={26}
            />
          ),
        }}
        name="ProfileStack"
        component={ProfileStackScreen}
      />
    </Tab.Navigator>
  );
};
