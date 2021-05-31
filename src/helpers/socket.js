import openSocket from 'socket.io-client/dist/socket.io';
import {AsyncStorage} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import {API_URL} from './constants';

export default class Socket {
  static instance = Socket.instance || new Socket();
  static connection = null;
  static isSubscribed = false;

  connect() {
    if (!Socket.connection) {
      Socket.connection = openSocket(API_URL, {
        cookie: false,
        transports: ['websocket'],
      });
      crashlytics().log('Connected to socket');
    } else {
      crashlytics().log('Error: Socket already is connected');
    }
  }

  subscribe({token, dispatch}) {
    if (Socket.connection) {
      if (!Socket.isSubscribed) {
        Socket.isSubscribed = true;
        Socket.connection.emit('subscribe', {token});
        this.setupListeners(dispatch);
      } else {
        crashlytics().log('Error: Already subscribed to socket');
      }
    } else {
      crashlytics().log(
        "Error: Tried to subscribe to socket but connection to socket wasn't made",
      );
    }
  }

  async setupListeners(dispatch) {
    const token = await AsyncStorage.getItem('token');
    Socket.connection.on('salut', async (data) => {
      if (data) {
        alert('data');
        crashlytics().log(
          'Received event to trigger update for an event from Socket connection, updating event on front-end',
        );
        // updateEvent(data)(dispatch)
      }
    });

    Socket.connection.on('reconnect', () => {
      this.subscribe({dispatch, cookie});
      crashlytics().log(
        'Reconnected to Socket connection after connection loss',
      );
    });
  }

  async unsubscribe(cookie) {
    if (Socket.connection && Socket.isSubscribed) {
      Socket.connection.emit('unsubscribe', {cookie});
      Socket.isSubscribed = false;
      crashlytics().log('Unsubscribed from Socket connection');
    }
  }
}
