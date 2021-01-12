import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ViroARScene, ViroARSceneNavigator, ViroConstants, ViroText} from 'react-viro';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import LottieView from 'lottie-react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthStack} from './auth/AuthStack';

export const MainNavigator = () => {
    const isLoggedIn = false
    return (
        isLoggedIn ?
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Settings" component={SettingsScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
            <Tab.Screen name="Permissions" component={PermissionsScreen}/>
        </Tab.Navigator>
            :
            <AuthStack/>
    );
};

function PermissionsScreen() {

    return (
        <SafeAreaView>
            <Text>Camera</Text>

        </SafeAreaView>
    );
}


function ProfileScreen() {

    return (
        <ViroARSceneNavigator initialScene={{scene: AR}}>

        </ViroARSceneNavigator>
    );
}

function AR() {
    const [text, setText] = useState('');
    const _onInitialized = (state, reason) => {
        if (state == ViroConstants.TRACKING_NORMAL) {
            setText('hello world');
        } else if (state == ViroConstants.TRACKING_NONE) {
            // Handle loss of tracking
        }
    };
    return (
        <ViroARScene onTrackingUpdated={_onInitialized}>
            <ViroText text={text} scale={[.5, .5, .5]} position={[0, 0, -1]}/>
        </ViroARScene>
    );
}

function HomeScreen() {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    useEffect(() => {
        Geolocation.watchPosition(
            ({coords: {latitude, longitude}}) => {
                setLat(latitude);
                setLng(longitude);
            },
            (e) => console.log(e),
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 500,
                distanceFilter: 1,
            },
        );
        return () => {
            Geolocation.stopObserving();
        };
    }, []);
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#141716',

        }}>
            <SafeAreaView>
                <View style={{
                    width: 300,
                    position: 'absolute',
                    top: 48,
                    alignSelf: 'center',
                    backgroundColor: 'yellow',
                    borderRadius: 5,
                }}><Text>Sunt smecher</Text></View>
            </SafeAreaView>
            <MapView
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                }}
                zoomEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}

                region={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}

            >
                <Marker.Animated
                    coordinate={{latitude: lat, longitude: lng}}
                >
                    <View style={{
                        transform: [
                            {scaleX: 1},
                        ],
                    }}>

                        <LottieView source={require('../assets/animations/burger.json')} autoPlay loop
                                    style={{width: 100, height: 100}}/>
                    </View>
                </Marker.Animated>
            </MapView>

        </View>
    );
}


function SettingsScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

        </View>
    );
}

const Tab = createBottomTabNavigator();
