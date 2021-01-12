import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MapView from 'react-native-maps';
import {Text, View, StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ViroARSceneNavigator,ViroARScene, ViroText, ViroConstants} from 'react-viro';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen'
export const App = () => {
    
    useEffect(()=>{
        SplashScreen.hide()
    },[])
    return (
        <NavigationContainer>
            <StatusBar barStyle={'light-content'} />
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#141716", zIndex: 100, elevation: 100}}>
                <LottieView source={require('./assets/animations/running.json')} autoPlay loop style={{width: '46%', marginTop: 1, marginLeft: -3}} />
            </View>

        </NavigationContainer>
    );
};


function ProfileScreen() {
    const _onInitialized = (state, reason) => {
        if (state == ViroConstants.TRACKING_NORMAL) {
            this.setState({
                text: "Hello World!"
            });
        } else if (state == ViroConstants.TRACKING_NONE) {
            // Handle loss of tracking
        }
    }
    return (
            <ViroARSceneNavigator initialScene={{scene: AR}} >

            </ViroARSceneNavigator>
    );
}

function AR() {
    return(
        <ViroARScene onTrackingUpdated={this._onInitialized}>
            <ViroText text={'1234'} scale={[.5, .5, .5]} position={[0, 0, -1]}/>
        </ViroARScene>
    )
}

function HomeScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#141716", zIndex: 100, elevation: 100}}>
            <LottieView source={require('./assets/animations/running.json')} autoPlay loop style={{width: '50%'}} />
        </View>
    );
}


function SettingsScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <MapView
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
}

const Tab = createBottomTabNavigator();


