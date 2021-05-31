import {Dimensions} from 'react-native';

export const DARK_COLOR = '#141716';
export const GREEN_COLOR = '#7AD8B9';
export const GREY_COLOR = '#6A6E75';
export const theme = {
  red: '#d10808',
  white: '#ffffff',
  black: '#000000',
  grey: '#6A6E75',
  dark: '#141716',
  green: '#7AD8B9',
};
export const whiteTheme = {
  red: '#d10808',
  white: '#ffffff',
  black: '#000000',
  grey: '#6A6E75',
  dark: '#141716',
  green: '#7AD8B9',
};

export const BIG_FONT_SIZE = Dimensions.get('screen').width / 8;

export const API_URL = 'http://192.168.2.101:8080/';

export const HTTP_NETWORK_INTERFACE = 'http://localhost:4000/';
export const SOCKET_NETWORK_INTERFACE = 'ws://localhost:4000/graphql';
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'/;
