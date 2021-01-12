import React from 'react';
import {Text, View} from 'react-native';
import {DARK_COLOR, GREEN_COLOR} from '../../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ripple from 'react-native-material-ripple';

export const WelcomeScreen = ({navigation}) => {
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
                justifyContent: 'space-between',
            }}>

                <LottieView source={require('../../assets/animations/panda.json')} autoPlay loop
                            style={{width: 300, alignSelf: 'center'}}/>
                <SafeAreaView>
                    <Ripple onPress={() => navigation.navigate('LoginScreen')} rippleColor={GREEN_COLOR} style={{
                        backgroundColor: DARK_COLOR,
                        borderRadius: 100,
                        width: 60,
                        height: 60,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        alignSelf: 'flex-end',
                    }}><Icon name={'arrow-forward'} color={GREEN_COLOR} size={50}/>
                </Ripple>
                </SafeAreaView>
            </View>
        </View>
    );
};
