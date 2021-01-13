import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {AppLoading} from './navigation/AppLoading';
import MainNavigator from './navigation/MainNavigator';
import configureStore from './helpers/store/configureStore';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const {store} = configureStore();
export const App = () => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const loadingOptions = ['The other lad was eventually hit by a train.', 'One of the men told the other that he wants to do that as well',
        'After pointing at the man, he shouted whether he was a kami.'];

    useEffect(() => {
        setLoadingText(loadingOptions[Math.floor(Math.random() * loadingOptions.length)]);
        setProgress(progress => progress + 0.1);
        const interval = setInterval(() => {
            setProgress(progress => progress + 0.02);
        }, 100);
        const textInterval = setInterval(() => {
            setLoadingText(loadingOptions[Math.floor(Math.random() * loadingOptions.length)]);
        }, 3000);
        setTimeout(() => {
            clearInterval(interval);
            clearInterval(textInterval);
            setIsLoading(false);
        }, 1000);
        SplashScreen.hide();

    }, []);

    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <Provider store={store}>
                    <StatusBar barStyle={'light-content'}/>
                    <AppLoading isLoading={isLoading} progress={progress} text={loadingText}/>
                    <MainNavigator/>
                </Provider>
            </SafeAreaProvider>
        </NavigationContainer>
    );
};


