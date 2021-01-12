import React, {PureComponent, useEffect, useState} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {ViroARScene, ViroARSceneNavigator, ViroText} from 'react-viro';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import LottieView from 'lottie-react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthStack} from './auth/AuthStack';
import {connect} from 'react-redux';
import AppleHealthKit, {HealthValue} from 'react-native-health';
import ProfileScreen from './profile/ProfileScreen';
import Modal from 'react-native-modal';
import Ripple from 'react-native-material-ripple';
import {DARK_COLOR, GREEN_COLOR, GREY_COLOR} from '../helpers/constants';

export const boxShadow = {
    margin: 2,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 5,
};

const MainNavigator = ({isLoggedIn}) => {
    return (
        isLoggedIn ?
            <Tab.Navigator tabBar={props => <MyTabBar {...props}/>}
                           tabBarOptions={{
                               activeTintColor: '#B92317',
                               labelStyle: {
                                   margin: 0,
                                   fontSize: 12,
                                   marginTop: 5,
                               },
                               keyboardHidesTabBar: true,
                               style: [{
                                   backgroundColor: '#fff',
                                   border: 0,
                                   borderTopColor: '#fff',
                                   borderTopWidth: 0,
                               }],
                           }} initialRouteName={'Settings'}>
                <Tab.Screen name={'Battlefield'} component={BattlefieldScreen}
                            options={{
                                iconOff: require('../assets/animations/battlefield-off.json'),
                                iconOn: require('../assets/animations/battlefield-on.json'),
                            }}/>
                <Tab.Screen name={'Leaderboard'} component={ProfileScreen}
                            options={{
                                iconOff: require('../assets/animations/leaderboard-off.json'),
                                iconOn: require('../assets/animations/leaderboard-on.json'),
                            }}/>
                <Tab.Screen name={'Profile'} component={ProfileScreen}
                            options={{
                                iconOff: require('../assets/animations/profile-off.json'),
                                iconOn: require('../assets/animations/profile-on.json'),
                            }}/>
                {/*<Tab.Screen name="Home" component={HomeScreen}/>*/}
                {/*<Tab.Screen name="Settings" component={ProfileScreen}/>*/}
                {/*<Tab.Screen name="Profile" component={ProfileScreen}/>*/}
                {/*<Tab.Screen name="Permissions" component={PermissionsScreen}/>*/}
            </Tab.Navigator>
            :
            <AuthStack/>
    );
};


class MyTabBar extends PureComponent {

    render() {
        const {state, descriptors, navigation} = this.props;
        return (
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: DARK_COLOR,
                    border: 0,
                    borderTopColor: '#fff',
                    borderTopWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 7,
                    },
                    shadowOpacity: 0.41,
                    shadowRadius: 9.11,
                }}>
                {state.routes.map((route, index) => {
                    const {options} = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name;

                    const isFocused = state.index === index;

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <MenuButton route={route} isFocused={isFocused} options={options}
                                    key={route.key}
                                    onLongPress={onLongPress} label={label} navigation={navigation}/>
                    );
                })}
            </View>
        );
    }
}

class MenuButton extends PureComponent {

    onPress = () => {
        const {route, isFocused, navigation} = this.props;

        if (this.ref) {
            this.ref.play();
        }
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
        });
        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.isFocused && this.ref && this.props.isFocused) {
            this.ref.play();
        }
    }

    render() {
        const {route, onLongPress, options, isFocused, label} = this.props;
        const {iconOn, iconOff} = options;

        return (
            <Ripple
                rippleOpacity={0.8}
                key={route.key}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={this.onPress}
                rippleColor={'#EAEDF2'}
                onLongPress={onLongPress}
                style={{flex: 1}}
            >
                <SafeAreaView style={{justifyContent: 'center'}}>
                    {
                        iconOn && iconOff &&
                        <LottieView source={isFocused ? iconOn : iconOff}

                                    style={{margin: 0, padding: 0, height: 40, alignSelf: 'center'}}
                                    progress={!isFocused ? 0 : undefined}

                                    loop={false}
                                    ref={anim => {
                                        this.ref = anim;
                                    }}/>
                    }

                    <Text style={{
                        textAlign: 'center', color: isFocused ? GREEN_COLOR : GREY_COLOR, margin: 0,
                        fontSize: 12,
                    }}>
                        {label}
                    </Text>
                </SafeAreaView>
            </Ripple>
        );
    }
}


const BattlefieldScreen = ({navigation}) => {
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

                        <LottieView source={require('../assets/animations/burger.json')} autoPlay loop
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


const Tab = createBottomTabNavigator();

export default connect((state) => ({isLoggedIn: state.user.isLoggedIn}), {})(MainNavigator);
