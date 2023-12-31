import {createRef, RefObject} from 'react';
import {NavigationContainerRef, StackActions} from '@react-navigation/native';

export type RootStackParamList = {
  LoginScreen: any;
  ProductsStack: any;
  ProductsScreen: any;
  ProductDetailScreen: {productId: number; title: string};
  ProfileScreen: any;
  CartScreen: any;
  CartStack: any;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export const navigationRef: RefObject<
  NavigationContainerRef<RootStackParamList>
> = createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate(
  name: keyof RootStackParamList,
  params?: RootStackParamList[keyof RootStackParamList],
) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function push(
  name: keyof RootStackParamList,
  params?: RootStackParamList[keyof RootStackParamList],
) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}
