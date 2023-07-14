import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GenericActionCreator} from 'utils';
import {LOGIN_ACTION_TYPES, LoginState} from './login.action';
import {GlobalState} from 'store/reducers';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const loginState = useSelector<GlobalState, LoginState>(state => state.LOGIN);
  const onPressLoginButton = () => {
    dispatch(GenericActionCreator({type: LOGIN_ACTION_TYPES.LOGIN_REQUEST}));
  };

  console.log('loginState', loginState);

  return (
    <View>
      <Text onPress={onPressLoginButton}>Login Screen</Text>
    </View>
  );
};
