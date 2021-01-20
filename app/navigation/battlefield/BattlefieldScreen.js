import React, {useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Animated, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import Ripple from 'react-native-material-ripple';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DARK_COLOR, GREEN_COLOR} from '../../helpers/constants';
import randomLocation from 'random-location';
import {Viro3DObject, ViroAmbientLight, ViroARScene, ViroARSceneNavigator} from 'react-viro';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';

export const BattlefieldScreen = ({navigation}) => {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [stepCount, setStepCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [kmCount, setKmCount] = useState(0);
    const [showingStepData, setShowStepData] = useState(true);
    const [content, setContent] = useState(<></>);

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

                // AppleHealthKit.initHealthKit(permissions, (error: string) => {
                //     if (error) {
                //         console.log('[ERROR] Cannot grant permissions!');
                //     }
                //
                //     AppleHealthKit.getStepCount({}, (callbackError: string, results: HealthValue[]) => {
                //         if (results && results.value) {
                //             setStepCount(results.value);
                //         }
                //     });
                //     AppleHealthKit.getDistanceWalkingRunning({}, (callbackError: string, results: HealthValue[]) => {
                //         if (results && results.value) {
                //             setKmCount(results.value);
                //         }
                //     });
                // });

            },
            (e) => console.log(e),
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 500,
                distanceFilter: 10,
            },
        );


    });
    useEffect(() => {
        // Geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
        //     setLat(latitude);
        //     setLng(longitude);
        //     // for (let i = 0; i < 5; i++) {
        //     //     const obj = randomLocation.randomCirclePoint({latitude: latitude, longitude: longitude}, 300);
        //     //     if(!locations.includes(obj)) {
        //     //         console.log(obj)
        //     //         setLocations([...locations, obj]);
        //     //     }
        //     // }
        // });
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
        //         if (results && results.value) {
        //             setStepCount(results.value);
        //         }
        //     });
        //     AppleHealthKit.getDistanceWalkingRunning({}, (callbackError: string, results: HealthValue[]) => {
        //         if (results && results.value) {
        //             setKmCount(results.value);
        //         }
        //     });
        // });
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
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        if (lat && lng) {
            if (locations.length < 5) {
                const obj = randomLocation.randomCirclePoint({latitude: lat, longitude: lng}, 300);

                if (!locations.includes(obj)) {
                    setLocations([...locations, obj]);
                }
            }
        }
    }, [lat, lng]);
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
                showsBuildings
                mapType={'mutedStandard'}
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
                {locations && locations.map((loc, index) => <Marker key={index}

                                                                    coordinate={{
                                                                        latitude: loc.latitude,
                                                                        longitude: loc.longitude,
                                                                    }}
                                                                    onPress={() => {
                                                                        setContent(<View style={{
                                                                            backgroundColor: '#fff',
                                                                            margin: 20,
                                                                            borderRadius: 40,
                                                                            padding: 20,
                                                                        }}><Ripple onPress={() => {
                                                                            setContent(<><ViroARSceneNavigator
                                                                                initialScene={{
                                                                                    scene: () => <ViroARScene>
                                                                                        <ViroAmbientLight
                                                                                            color="#ffffff"/>
                                                                                        <Viro3DObject
                                                                                            onDrag={(dragToPos, source) => {
                                                                                                console.log(dragToPos);
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
                                                                                <View style={{
                                                                                    position: 'absolute',
                                                                                    right: 20,
                                                                                    top: 48,
                                                                                    alignItems: 'center',
                                                                                }}>
                                                                                    <Ripple onPress={() => {
                                                                                        setShowModal(false);
                                                                                        setTimeout(() => setContent(<></>), 500);
                                                                                    }} style={{
                                                                                        backgroundColor: '#fff',
                                                                                        justifyContent: 'center',
                                                                                        alignSelf: 'center',
                                                                                        borderRadius: 40,
                                                                                    }}>
                                                                                        <MaterialIcons name={'close'}
                                                                                                       size={40}/>
                                                                                    </Ripple>
                                                                                </View></>);
                                                                        }
                                                                        }><Text>Fight</Text></Ripple></View>);
                                                                        setShowModal(true);

                                                                    }}
                >
                    <View style={{
                        transform: [
                            // {scaleX: -1},
                        ],
                    }}>
                        {/*<Text style={{textAlign: 'center', color: '#fff'}}>Level 5</Text>*/}
                        <LottieView source={require('../../assets/animations/panda.json')} autoPlay loop
                                    style={{width: 100, height: 100}}/>
                    </View>
                </Marker>)}

                <Marker

                    coordinate={{latitude: lat, longitude: lng}}
                    onPress={() => {
                        setShowModal(true);

                        setContent(<View
                            style={{backgroundColor: '#fff', margin: 20, borderRadius: 40, padding: 20}}><View style={{
                            backgroundColor: DARK_COLOR,
                            borderBottomRightRadius: 40,
                            borderBottomLeftRadius: 40,
                        }}>
                            <SafeAreaView style={{padding: 20, flexDirection: 'row'}}>
                                <Ripple onPress={() => {
                                    // LottieRef.current.play();
                                }} style={{width: 100, height: 100, backgroundColor: GREEN_COLOR, borderRadius: 500}}>
                                    <LottieView  source={require('../../assets/animations/burger.json')}
                                                style={{width: '100%', height: '100%'}} loop={false}
                                                progress={undefined}/>
                                </Ripple>
                                <View style={{alignSelf: 'center', marginLeft: 10, flex: 1}}>
                                    <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>Radu Emilian</Text>
                                    <Text style={{color: '#fff', fontSize: 10, fontWeight: '200'}}>Burger - Level
                                        5</Text>
                                    <View style={{width: '100%'}}>
                                        <Progress.Bar width={null} animated={true} progress={0.5}
                                                      color={'rgba(122,216,185,100)'}
                                                      style={{marginTop: 5, marginBottom: 2}}/>
                                    </View>
                                    <View
                                        style={{width: '100%', justifyContent: 'space-between', flexDirection: 'row'}}>
                                        <Text style={{color: '#fff', fontSize: 10, fontWeight: '200'}}>0</Text>
                                        <Text style={{color: '#fff', fontSize: 10, fontWeight: '200'}}>500</Text>
                                    </View>

                                </View>
                            </SafeAreaView>
                        </View></View>);
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


            <Modal animationOutTiming={400} animationOut={'slideOutDown'} isVisible={showModal} style={{margin: 0}}
                   onBackdropPress={() => {
                       setShowModal(false);
                       setTimeout(() => setContent(<></>), 400);
                   }}>
                {content}
            </Modal>


        </View>
    );
};
