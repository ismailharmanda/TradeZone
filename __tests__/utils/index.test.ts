import {
  GenericActionCreator,
  emailValidator,
  passwordValidator,
  toFixedNumber,
} from 'utils';

describe('GenericActionCreator', () => {
  it('creates a generic action with type and payload', () => {
    const action = GenericActionCreator({
      type: 'ACTION_TYPE',
      payload: {key: 'value'},
    });
    expect(action.type).toBe('ACTION_TYPE');
    expect(action.payload).toEqual({key: 'value'});
  });
});

describe('emailValidator', () => {
  it('returns an error message when email is empty', () => {
    const errorMessage = emailValidator('');
    expect(errorMessage).toBe('Email cannot be empty.');
  });

  it('returns an error message when email is invalid', () => {
    const errorMessage = emailValidator('invalid-email');
    expect(errorMessage).toBe('Ooops! We need a valid email address.');
  });

  it('returns an empty string when email is valid', () => {
    const errorMessage = emailValidator('valid@example.com');
    expect(errorMessage).toBe('');
  });
});

describe('passwordValidator', () => {
  it('returns an error message when password is empty', () => {
    const errorMessage = passwordValidator('');
    expect(errorMessage).toBe('Password cannot be empty.');
  });

  it('returns an empty string when password is not empty', () => {
    const errorMessage = passwordValidator('password');
    expect(errorMessage).toBe('');
  });
});

describe('toFixedNumber', () => {
  it('returns the number with specified digits', () => {
    const result = toFixedNumber(3.14159, 2);
    expect(result).toBe(3.14);
  });

  it('returns the number with specified digits and base', () => {
    const result = toFixedNumber(3.14159, 2, 2);
    expect(result).toBe(3.25);
  });
});
