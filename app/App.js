import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AsyncStorage, LogBox, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import MainNavigator from './src/navigation/MainNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import {AppearanceProvider} from 'react-native-appearance';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/graphql';
import {token} from './src/helpers/variables';
import {SiriShortcutsEvent} from 'react-native-siri-shortcut';
import moment from 'moment';

moment().locale('ro');

LogBox.ignoreAllLogs();
export const App = () => {
  const routeNameRef = useRef();
  const navigationRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [loadedNav, setLoadedNav] = useState(false);

  useEffect(() => {
    // Socket.instance.connect();
    SiriShortcutsEvent.addListener(
      'SiriShortcutListener',
      ({userInfo, activityType}) => {
        alert('aici');
      },
    );
    crashlytics().log('App mounted.');
    const checkToken = async () => {
      token(await AsyncStorage.getItem('accessToken'));
    };
    checkToken().then(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loadedNav && loaded) {
      SplashScreen.hide();
    }
  }, [loadedNav, loaded]);

  return (
    <AppearanceProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <SafeAreaProvider>
            <StatusBar barStyle={'light-content'} />
            <MainNavigator setLoadedNav={setLoadedNav} />
          </SafeAreaProvider>
        </NavigationContainer>
      </ApolloProvider>
    </AppearanceProvider>
  );
};
