import React from 'react';
import {Text, View} from 'react-native';
import {DARK_COLOR, GREEN_COLOR} from '../../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export const LocationScreen = ({navigation}) => {
    const onPress = async () => {
        const locationWhenInUse = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (locationWhenInUse === RESULTS.GRANTED) {
            navigation.navigate('HealthScreen');
        } else {
            alert('aici');
        }
    };
    return (
        <View style={{backgroundColor: DARK_COLOR, flex: 1}}>
            <SafeAreaView style={{padding: 20, paddingBottom: 0, flexDirection: 'row'}}>
                <Ripple style={{alignSelf: 'center', marginRight: 10}} onPress={() => {
                    navigation.goBack();
                }}>
                    <Icon name={'arrow-back'} color={GREEN_COLOR} size={30}/>
                </Ripple>
                <Text style={{fontSize: 60, color: GREEN_COLOR, fontWeight: 'bold'}}>Location</Text>
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

                <LottieView source={require('../../assets/animations/location.json')} autoPlay loop
                            style={{width: 300, alignSelf: 'center', flex: 1}}/>
                <SafeAreaView style={{alignSelf: 'flex-end', width: '100%'}}>
                    <Text style={{color: DARK_COLOR, textAlign: 'center', padding: 10, fontSize: 16}}>In order to get
                        the the maps functionality we need access to your location</Text>
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
                    }}><Ionicons name={'location'} color={'#fff'} size={20}/>
                        <Text style={{color: '#fff', marginLeft: 10}}>Allow location permissions</Text>
                    </Ripple>
                    <Text style={{color: DARK_COLOR, textAlign: 'center', padding: 10, marginTop: 20, fontSize: 12}}>How
                        is my location used?</Text>

                </SafeAreaView>
            </View>

        </View>
    );
};
