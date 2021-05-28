import {EMAIL_REGEX, PASSWORD_REGEX} from './constants';

export const loginValidator = ({email, password}) => {
  const errors = {};

  if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Email not valid';
  }
  if (!PASSWORD_REGEX.test(password)) {
    errors.password = 'Password not valid';
  }
  return errors;
};

export const validateEmail = (email) => {
  if (!EMAIL_REGEX.test(email)) {
    return false;
  }
  return true;
};
