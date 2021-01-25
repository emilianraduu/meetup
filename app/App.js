import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {AppLoading} from './navigation/AppLoading';
import MainNavigator from './navigation/MainNavigator';
import configureStore from './helpers/store/configureStore';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import Socket from './helpers/store/socket';

const {store} = configureStore();
export const App = () => {

    const routeNameRef = React.useRef();
    const navigationRef = React.useRef();


    useEffect(() => {
        Socket.instance.connect()
        crashlytics().log('App mounted.');
        setTimeout(() => SplashScreen.hide(), 100);

    }, []);

    return (
        <NavigationContainer
            ref={navigationRef}
            onStateChange={() => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute().name;
                if (previousRouteName !== currentRouteName) {
                    analytics().logScreenView({
                        screen_name: currentRouteName,
                        screen_class: currentRouteName,
                    });
                }
                routeNameRef.current = currentRouteName;
            }}>
            <SafeAreaProvider>
                <Provider store={store}>
                    <StatusBar barStyle={'light-content'}/>
                    <MainNavigator/>
                </Provider>
            </SafeAreaProvider>
        </NavigationContainer>
    );
};


