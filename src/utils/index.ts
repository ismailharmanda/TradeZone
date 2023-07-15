import {AnyAction} from 'redux';

export interface IGenericAction {
  <T extends {type?: any; payload?: any}>({type, payload}: T): AnyAction;
}

export const GenericActionCreator: IGenericAction = ({
  type,
  payload,
}): AnyAction => ({
  type,
  payload,
});

export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) {
    return 'Email cannot be empty.';
  }
  if (!re.test(email)) {
    return 'Ooops! We need a valid email address.';
  }

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) {
    return 'Password cannot be empty.';
  }

  return '';
};
