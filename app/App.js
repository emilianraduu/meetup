import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AsyncStorage, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import MainNavigator from './navigation/MainNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import Socket from './helpers/socket';
import {AppearanceProvider} from 'react-native-appearance';
import {ApolloProvider} from 'react-apollo';
import {client} from './graphql';
import {token} from './helpers/variables';

export const App = () => {
  const routeNameRef = useRef();
  const navigationRef = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Socket.instance.connect();
    crashlytics().log('App mounted.');
    setTimeout(() => SplashScreen.hide(), 100);
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      token(await AsyncStorage.getItem('accessToken'));
    };
    checkToken().then(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <AppearanceProvider>
      <ApolloProvider client={client}>
        <NavigationContainer
          ref={navigationRef}
          onStateChange={() => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute()
              .name;
            if (previousRouteName !== currentRouteName) {
              analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              });
            }
            routeNameRef.current = currentRouteName;
          }}>
          <SafeAreaProvider>
            <StatusBar barStyle={'light-content'} />
            <MainNavigator />
          </SafeAreaProvider>
        </NavigationContainer>
      </ApolloProvider>
    </AppearanceProvider>
  );
};
