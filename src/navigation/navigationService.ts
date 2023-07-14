import {createRef, RefObject} from 'react';
import {NavigationContainerRef, StackActions} from '@react-navigation/native';
import {SCREENS} from 'config/screens';

type RootStackParamList = {
  [SCREENS.LOGIN]: any;
  [SCREENS.PRODUCTS]: any;
  [SCREENS.PRODUCT_DETAIL]: {productId: Number};
  [SCREENS.PROFILE]: any;
  [SCREENS.CART]: any;
};

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
