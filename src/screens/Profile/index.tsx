import {View, Text} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalState} from 'store/reducers';
import {LOGIN_ACTION_TYPES, LoginState} from 'screens/Login/login.action';
import {GenericActionCreator} from 'utils';

export const ProfileScreen = () => {
  const dispatch = useDispatch();

  const loginState = useSelector<GlobalState, LoginState>(state => state.LOGIN);
  console.log('loginState', loginState);

  const onPressLogout = () => {
    dispatch(
      GenericActionCreator({
        type: LOGIN_ACTION_TYPES.LOGOUT,
      }),
    );
  };

  return (
    <View>
      <Text>Profile Screen</Text>
      <Text onPress={onPressLogout}>LOGOUT</Text>
    </View>
  );
};
