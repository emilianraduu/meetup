import React, {useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Animated, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import {Viro3DObject, ViroAmbientLight, ViroARScene, ViroARSceneNavigator} from 'react-viro';
import AppleHealthKit from 'react-native-health';
import Ripple from 'react-native-material-ripple';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DARK_COLOR} from '../../helpers/constants';

export const BattlefieldScreen = ({navigation}) => {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [stepCount, setStepCount] = useState(0);
    const [showAr, setShowAr] = useState(false);
    const [kmCount, setKmCount] = useState(0);
    const [showingStepData, setShowStepData] = useState(true);
    useEffect(() => {

        Geolocation.watchPosition(
            ({coords: {latitude, longitude}}) => {
                setLat(latitude);
                setLng(longitude);
                const permissions = {
                    permissions: {
                        read: [
                            AppleHealthKit.Constants.Permissions.StepCount,
                            AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
                        ],
                    },
                };

                AppleHealthKit.initHealthKit(permissions, (error: string) => {
                    if (error) {
                        console.log('[ERROR] Cannot grant permissions!');
                    }

                    AppleHealthKit.getStepCount({}, (callbackError: string, results: HealthValue[]) => {
                        setStepCount(results.value);
                    });
                    AppleHealthKit.getDistanceWalkingRunning({}, (callbackError: string, results: HealthValue[]) => {
                        setKmCount(results.value);
                    });
                });

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
    useEffect(() => {
        Geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setLat(latitude);
            setLng(longitude);
        });
        const permissions = {
            permissions: {
                read: [
                    AppleHealthKit.Constants.Permissions.StepCount,
                    AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
                ],
            },
        };

        AppleHealthKit.initHealthKit(permissions, (error: string) => {
            if (error) {
                console.log('[ERROR] Cannot grant permissions!');
            }

            AppleHealthKit.getStepCount({}, (callbackError: string, results: HealthValue[]) => {
                setStepCount(results.value);
            });
            AppleHealthKit.getDistanceWalkingRunning({}, (callbackError: string, results: HealthValue[]) => {
                setKmCount(results.value);
            });
        });
    }, []);
    const moveAnim = useRef(new Animated.Value(20)).current;
    const flipAnim = useRef(new Animated.Value(1)).current;
    const [dataViewWidth, setDataViewWidth] = useState(0);
    const toggleData = () => {
        setShowStepData(!showingStepData);

    };
    useEffect(() => {
        if (showingStepData) {
            Animated.timing(
                moveAnim,
                {
                    toValue: 20,
                    useNativeDriver: false, duration: 1000,
                },
            ).start();
            Animated.timing(
                flipAnim,
                {
                    toValue: 1,
                    useNativeDriver: false, duration: 1000,
                },
            ).start();
        } else {
            Animated.timing(
                moveAnim,
                {
                    toValue: -dataViewWidth + 20,
                    useNativeDriver: false, duration: 1000,
                },
            ).start();
            Animated.timing(
                flipAnim,
                {
                    toValue: 0,
                    useNativeDriver: false, duration: 1000,
                },
            ).start();
        }
    }, [showingStepData]);
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#141716',
        }}>
            <Animated.View style={{
                position: 'absolute',
                top: 48,
                right: moveAnim,
                flexDirection: 'row',
            }} onLayout={(event) => {
                let {width} = event.nativeEvent.layout;
                setDataViewWidth(width);
            }}>
                <Ripple onPress={toggleData} style={{
                    backgroundColor: '#fff',
                    height: '50%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                }}>
                    <Animated.View style={{
                        transform: [
                            {
                                rotate: flipAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '180deg'],
                                }),
                            },
                        ],
                    }}>
                        <MaterialIcons name={'arrow-left'} size={20} color={DARK_COLOR}/>
                    </Animated.View>
                </Ripple>
                <Ripple style={{
                    padding: 7,
                    paddingRight: 10,
                    alignSelf: 'center',
                    backgroundColor: 'rgba(255,255,255, 1)',
                    borderRadius: 20,
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <LottieView source={require('../../assets/animations/walk.json')} autoPlay loop
                                    style={{width: 30, alignSelf: 'center'}}/>
                        <Text>{stepCount.toFixed(0)} or {Number(kmCount / 1000).toFixed(2)}km</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <LottieView source={require('../../assets/animations/coin.json')} autoPlay loop
                                    style={{width: 30, alignSelf: 'center'}}/>

                        <Text>1000 coins</Text>
                    </View>
                </Ripple>
            </Animated.View>
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
                zoomEnabled={false}
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

                    coordinate={{latitude: lat, longitude: lng}}
                    onPress={() => {
                        setShowAr(true);
                    }}
                >
                    <View style={{
                        transform: [
                            // {scaleX: -1},
                        ],
                    }}>
                        {/*<Text style={{textAlign: 'center', color: '#fff'}}>Level 5</Text>*/}
                        <LottieView source={require('../../assets/animations/burger.json')} autoPlay loop
                                    style={{width: 100, height: 100}}/>
                    </View>
                </Marker>
            </MapView>


            <Modal isVisible={showAr} style={{margin: 0}}>
                <ViroARSceneNavigator initialScene={{
                    scene: () => <ViroARScene>
                        <ViroAmbientLight color="#ffffff"/>
                        <Viro3DObject
                            onDrag={(dragToPos, source)=> {
                                console.log(dragToPos)
                            }}
                            source={require('../../assets/models/emoji_angry_anim.vrx')}
                            resources={[
                                require('../../assets/models/emoji_angry_diffuse.png'),
                                require('../../assets/models/emoji_angry_normal.png'),
                                require('../../assets/models/emoji_angry_specular.png')]}
                            highAccuracyEvents={true}
                            position={[0, -.1, -1]}
                            scale={[0.5, 0.5, 0.5]}
                            rotation={[45, 0, 0]}
                            type="VRX"
                            transformBehaviors={['billboard']}/>
                    </ViroARScene>,
                }}>

                </ViroARSceneNavigator>
                <View style={{position: 'absolute', right: 20, top: 48, alignItems: 'center'}}>
                    <Ripple onPress={() => setShowAr(false)} style={{
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderRadius: 40,
                    }}>
                        <MaterialIcons name={'close'} size={40}/>
                    </Ripple>
                </View>
            </Modal>
        </View>
    );
};
