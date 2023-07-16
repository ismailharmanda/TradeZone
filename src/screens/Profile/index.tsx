import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalState} from 'store/reducers';
import {LOGIN_ACTION_TYPES, LoginState} from 'screens/Login/login.action';
import {GenericActionCreator} from 'utils';
import {Button} from 'common/Button';
import {Container} from 'common/Container';

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
    <Container containerStyle={styles.container}>
      <Button text="LOGOUT" onPress={onPressLogout} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
  },
});
