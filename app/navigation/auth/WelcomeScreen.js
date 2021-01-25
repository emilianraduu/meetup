import React from 'react';
import {Text, View} from 'react-native';
import {DARK_COLOR, GREEN_COLOR} from '../../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/Foundation';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {lightVibration} from '../../helpers/vibrations';

export const WelcomeScreen = ({navigation}) => {
    const onPress = () => {
        lightVibration()
        navigation.navigate('LoginScreen');
    }
    return (
        <View style={{backgroundColor: DARK_COLOR, flex: 1}}>

            <SafeAreaView style={{padding: 20, paddingBottom: 0}}>
                <Text style={{fontSize: 60, color: GREEN_COLOR, fontWeight: 'bold'}}>Welcome</Text>
            </SafeAreaView>
            <View style={{
                backgroundColor: GREEN_COLOR,
                flex: 1,
                borderTopRightRadius: 60,
                padding: 20,
            }}>
                <LottieView source={require('../../assets/animations/panda.json')} autoPlay loop
                            style={{width: 500, alignSelf: 'center', flex: 1}}/>
            </View>
            <SafeAreaView style={{backgroundColor: GREEN_COLOR, flex: 1, justifyContent: 'center'}}>
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
                }}><Icon name={'foot'} color={'#fff'} size={20}/>
                    <Text style={{color: '#fff', marginLeft: 10}}>Let's take a few steps together</Text>
                </Ripple>

            </SafeAreaView>
        </View>
    );
};
