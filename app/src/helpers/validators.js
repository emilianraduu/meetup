import {EMAIL_REGEX} from './constants';

export const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = (password) => {
  return password.length > 6;
};
