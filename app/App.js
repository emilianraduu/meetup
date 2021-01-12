import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { StatusBar, Animated} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {AppLoading} from './navigation/AppLoading';
import {MainNavigator} from './navigation/MainNavigator';

export const App = () => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const loadingOptions = ['The other lad was eventually hit by a train.', 'One of the men told the other that he wants to do that as well',
    'After pointing at the man, he shouted whether he was a kami.']

    useEffect(() => {
        SplashScreen.hide();
        setLoadingText(loadingOptions[Math.floor(Math.random() * loadingOptions.length)])
        setProgress(progress => progress + 0.1);
        const interval = setInterval(() => {
            setProgress(progress => progress + 0.02);
        }, 100);
        const textInterval = setInterval(()=>{
            setLoadingText(loadingOptions[Math.floor(Math.random() * loadingOptions.length)])
        }, 3000)
        setTimeout(() => {
            clearInterval(interval);
            clearInterval(textInterval)
            setIsLoading(false);
        }, 500);
    }, []);

    return (
        <NavigationContainer>
            <StatusBar barStyle={'light-content'}/>
            <AppLoading isLoading={isLoading} progress={progress} text={loadingText}/>
            <MainNavigator/>
        </NavigationContainer>
    );
};


