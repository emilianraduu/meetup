import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker} from 'react-native-maps';
import LottieView from "lottie-react-native";
import Modal from 'react-native-modal';
import {ViroARScene, ViroARSceneNavigator, ViroText} from 'react-viro';

export const BattlefieldScreen = ({navigation}) => {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [stepCount, setStepCount] = useState(0);
    const [showAr, setShowAr] = useState(false);
    const [kmCount, setKmCount] = useState(0);
    useEffect(() => {
        Geolocation.watchPosition(
            ({coords: {latitude, longitude}}) => {
                setLat(latitude);
                setLng(longitude);
                // const permissions = {
                //     permissions: {
                //         read: [
                //             AppleHealthKit.Constants.Permissions.StepCount,
                //             AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
                //         ],
                //     },
                // };
                //
                // AppleHealthKit.initHealthKit(permissions, (error: string) => {
                //     if (error) {
                //         console.log('[ERROR] Cannot grant permissions!');
                //     }
                //
                //     AppleHealthKit.getStepCount({}, (callbackError: string, results: HealthValue[]) => {
                //         setStepCount(results.value);
                //     });
                //     AppleHealthKit.getDistanceWalkingRunning({}, (callbackError: string, results: HealthValue[]) => {
                //         setKmCount(results.value);
                //     });
                // });

            },
            (e) => console.log(e),
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 500,
                distanceFilter: 1,
            },
        );


    });
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#141716',

        }}>
            <SafeAreaView>
                <View style={{
                    padding: 20,
                    position: 'absolute',
                    top: 48,
                    alignSelf: 'center',
                    backgroundColor: 'yellow',
                    borderRadius: 5,
                }}><Text>{stepCount} or {Number(kmCount / 1000).toFixed(2)}km</Text></View>
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
                minZoomLevel={12}
                maxZoomLevel={25}
                scrollEnabled={false}
                rotateEnabled={false}
                region={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}

            >
                <Marker
                    onPress={() => {
                        alert('aici');
                    }}
                    coordinate={{latitude: lat, longitude: lng}}
                    // onPress={() => {
                    //     setShowAr(true);
                    // }}
                >
                    <View style={{
                        transform: [
                            {scaleX: 1},
                        ],
                    }}>

                        <LottieView source={require('../../assets/animations/burger.json')} autoPlay loop
                                    style={{width: 100, height: 100}}/>
                    </View>
                </Marker>
            </MapView>


            <Modal visible={showAr} style={{margin: 0}}>
                <ViroARSceneNavigator initialScene={{
                    scene: () => <ViroARScene onPinch={() => setShowAr(false)}>
                        <ViroText text={'salut baieti'} style={{fontWeight: 'bold', color: 'red', fontSize: 20}}
                                  scale={[.5, .5, .5]} position={[0, 0, -0.1]}/>
                    </ViroARScene>,
                }}>

                </ViroARSceneNavigator>
            </Modal>
        </View>
    );
};
