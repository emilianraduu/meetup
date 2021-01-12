import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {LayoutAnimation, StatusBar, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ViroARScene, ViroARSceneNavigator, ViroConstants, ViroText} from 'react-viro';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';
import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';

export const App = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        SplashScreen.hide();
        const permissions = {
            permissions: {
                read: [
                    AppleHealthKit.Constants.Permissions.StepCount,
                ],

            }
        }


        AppleHealthKit.initHealthKit(permissions, (error: string) => {
            /* Called after we receive a response from the system */

            if (error) {
                console.log('[ERROR] Cannot grant permissions!')
            }

            /* Can now read or write to HealthKit */

            const options = {
                startDate: (new Date(2020, 1, 1)).toISOString(),
            }

            AppleHealthKit.getStepCount(options, (callbackError: string, results: HealthValue[]) => {
                console.log(results)
                /* Samples are now collected from HealthKit */
            });
        });
        const interval = setInterval(() => {
            setProgress(progress => progress + 0.1);
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            setIsLoading(false);
            // LayoutAnimation.configureNext(
            LayoutAnimation.create(
                500,
                LayoutAnimation.Types.easeIn,
                LayoutAnimation.Properties.opacity,
            );
            // );
        }, 2000);
    }, []);

    return (
        <NavigationContainer>
            <StatusBar barStyle={'light-content'}/>

            <Modal isVisible={isLoading} animationInTiming={1} animationOut={'fadeOut'} style={{flex: 1, margin: 0}}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#141716',
                    zIndex: 100,
                    elevation: 100,
                }}>
                    <LottieView source={require('./assets/animations/running.json')} autoPlay loop
                                style={{width: '46%', marginTop: 1, marginLeft: -3}}/>
                    <View style={{position: 'absolute', width: '100%', bottom: 100, alignItems: 'center'}}>
                        <Progress.Bar progress={progress} width={200} color={'rgba(122,216,185,100)'}/>
                    </View>
                </View>
            </Modal>

            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Settings" component={SettingsScreen}/>
                <Tab.Screen name="Profile" component={ProfileScreen}/>
            </Tab.Navigator>

        </NavigationContainer>
    );
};


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
            ({coords: {latitude, longitude}})=> {
                setLat(latitude)
                setLng(longitude)
            },
            (e)=>console.log(e),
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
                    longitudeDelta: 0.02,    }}

            >
                <Marker
                    coordinate={{latitude: lat, longitude: lng}}
                    title={'123'}
                >
                    <View style={{ transform: [
                            { scaleX: 1 }
                        ]}}>

                    <LottieView source={require('./assets/animations/burger.json')} autoPlay loop
                                style={{ width: 100, height: 100, }}/>
                    </View>
                </Marker>
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


