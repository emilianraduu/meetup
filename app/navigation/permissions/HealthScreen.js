import React from 'react';
import {Text, View} from 'react-native';
import {DARK_COLOR, GREEN_COLOR} from '../../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Ripple from 'react-native-material-ripple';
import {connect} from 'react-redux';
import {loginUser} from '../../helpers/actions/UserActions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppleHealthKit from 'react-native-health';

const HealthScreen = ({loginUser, navigation}) => {
    const onPress = async () => {
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
            } else {
                loginUser();
            }
        });

    };
    return (
        <View style={{backgroundColor: DARK_COLOR, flex: 1}}>
            <SafeAreaView style={{padding: 20, paddingBottom: 0, flexDirection: 'row'}}>
                <Ripple style={{alignSelf: 'center', marginRight: 10}} onPress={() => {
                    navigation.goBack();
                }}>
                    <Icon name={'arrow-back'} color={GREEN_COLOR} size={30}/>
                </Ripple>
                <Text style={{fontSize: 60, color: GREEN_COLOR, fontWeight: 'bold'}}>Health</Text>
            </SafeAreaView>
            <View style={{
                backgroundColor: GREEN_COLOR,
                flex: 1,
                borderTopLeftRadius: 60,
                borderTopRightRadius: 60,
                padding: 20,
                marginLeft: 20,
                marginRight: 20,
            }}>

                <LottieView source={require('../../assets/animations/health.json')} autoPlay loop
                            style={{width: 300, alignSelf: 'center', flex: 1}}/>
                <SafeAreaView style={{alignSelf: 'flex-end', width: '100%'}}>
                    <Text style={{color: DARK_COLOR, textAlign: 'center', padding: 10, fontSize: 16}}>In order to use
                        the app we need health access for your steps and travelled distance.</Text>
                    <Ripple rippleColor={'#fff'} onPress={onPress} style={{
                        backgroundColor: DARK_COLOR,
                        borderRadius: 5,
                        width: 250,
                        height: 50,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        alignSelf: 'center',
                    }}><Ionicons name={'heart'} color={'#fff'} size={20}/>
                        <Text style={{color: '#fff', marginLeft: 10}}>Allow health permissions</Text>
                    </Ripple>
                    <Text style={{color: DARK_COLOR, textAlign: 'center', padding: 10, marginTop: 20, fontSize: 12}}>How
                        is my health data used?</Text>
                </SafeAreaView>
            </View>

        </View>
    );
};
export default connect((state) => ({}), {loginUser})(HealthScreen);
