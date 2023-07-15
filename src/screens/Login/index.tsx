import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GenericActionCreator, emailValidator, passwordValidator} from 'utils';
import {LOGIN_ACTION_TYPES, LoginState} from './login.action';
import {GlobalState} from 'store/reducers';
import {Container} from 'common/Container';
import {Button} from 'common/Button';
import {TextInput} from 'common/TextInput';

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const loginState = useSelector<GlobalState, LoginState>(state => state.LOGIN);

  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const isLoginButtonDisabled =
    !email.value ||
    !!email.error ||
    !password.value ||
    !!password.error ||
    loginState.loading;

  const onChangeEmail = (text: string) => {
    const error = emailValidator(text);
    setEmail({error, value: text});
  };
  const onChangePassword = (text: string) => {
    const error = passwordValidator(text);
    setPassword({error, value: text});
  };

  const onPressLoginButton = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
    } else {
      setEmail({...email, error: ''});
      setPassword({...password, error: ''});
    }
    dispatch(GenericActionCreator({type: LOGIN_ACTION_TYPES.LOGIN_REQUEST}));
  };

  return (
    <Container>
      <TextInput
        onChangeText={onChangeEmail}
        errorText={email.error}
        placeholder="Email"
        textContentType="emailAddress"
      />
      <TextInput
        onChangeText={onChangePassword}
        errorText={password.error}
        placeholder="Password"
        textContentType="password"
      />
      <Button
        disabled={isLoginButtonDisabled}
        loading={loginState.loading}
        onPress={onPressLoginButton}
        text="Login"
      />
    </Container>
  );
};
