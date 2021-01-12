import React from 'react';
import {Text, View} from 'react-native';
import {DARK_COLOR, GREEN_COLOR} from '../../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Ripple from 'react-native-material-ripple';

export const CameraScreen = ({navigation}) => {
    return (
        <View style={{backgroundColor: DARK_COLOR, flex: 1}}>
            <SafeAreaView style={{padding: 20, paddingBottom: 0}}>
                <Text style={{fontSize: 60, color: GREEN_COLOR, fontWeight: 'bold'}}>Camera</Text>
            </SafeAreaView>
            <View style={{
                backgroundColor: GREEN_COLOR,
                flex: 1,
                borderTopLeftRadius: 60,
                padding: 20,
                marginLeft: 20,
            }}>

                <LottieView source={require('../../assets/animations/camera.json')} autoPlay loop
                            style={{width: 300, alignSelf: 'center'}}/>
                <SafeAreaView style={{alignSelf: 'flex-end', width: '100%'}}>
                    <Ripple rippleColor={GREEN_COLOR} style={{
                        borderRadius: 5,
                        width: 250,
                        height: 50,
                        marginBottom: 10,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        alignSelf: 'center',
                    }} onPress={()=>navigation.navigate('LocationScreen')}>
                        <Text style={{color: '#fff', marginLeft: 10}}>Allow camera permissions</Text>
                    </Ripple>

                </SafeAreaView>
            </View>

        </View>
    );
};
