import {useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GenericActionCreator, emailValidator, passwordValidator} from 'utils';
import {LOGIN_ACTION_TYPES, LoginState} from './login.action';
import {GlobalState} from 'store/reducers';
import {Container} from 'common/Container';
import {Button} from 'common/Button';
import {Input} from 'common/Input';

type LoginInput = {
  value: string;
  error: string;
};

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const loginState = useSelector<GlobalState, LoginState>(state => state.LOGIN);

  const [email, setEmail] = useState<LoginInput>({value: '', error: ''});
  const [password, setPassword] = useState<LoginInput>({value: '', error: ''});

  const isLoginButtonDisabled = useMemo(() => {
    //Cok masrafli bir calculation degil ancak ben useMemo ne ise yarar biliyorum demek icin gosterilebilir.
    return (
      !email.value ||
      !!email.error ||
      !password.value ||
      !!password.error ||
      loginState.loading
    );
  }, [
    email.error,
    email.value,
    loginState.loading,
    password.error,
    password.value,
  ]);

  const onChangeEmail = (text: string) => {
    const error = emailValidator(text);
    setEmail({error, value: text});
  };
  const onChangePassword = (text: string) => {
    const error = passwordValidator(text);
    setPassword({error, value: text});
  };

  const onPressLoginButton = () => {
    dispatch(GenericActionCreator({type: LOGIN_ACTION_TYPES.LOGIN_REQUEST}));
  };

  return (
    <Container>
      <Input
        inputMode="email"
        onChangeText={onChangeEmail}
        errorText={email.error}
        placeholder="Email"
        textContentType="emailAddress"
      />
      <Input
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
