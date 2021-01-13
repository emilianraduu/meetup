import React from 'react';
import {Text, View, ScrollView} from 'react-native';
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
            <View  style={{
                backgroundColor: GREEN_COLOR,
                flex: 1,
                borderTopRightRadius: 60,
                padding: 20,

            }}>
                <Text style={{fontWeight: '600'}}> Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                    also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                <LottieView source={require('../../assets/animations/welcome.json')} autoPlay loop
                            style={{width: 300, alignSelf: 'center'}}/>
            </View>
                <SafeAreaView style={{backgroundColor: GREEN_COLOR}}>
                    <Ripple onPress={() => navigation.navigate('LoginScreen')} rippleColor={GREEN_COLOR} style={{
                        backgroundColor: DARK_COLOR,
                        borderRadius: 100,
                        width: 60,
                        height: 60,
                        right: 20,
                        alignItems: 'center',
                        flexDirection: 'row',
                        position: 'absolute',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        alignSelf: 'flex-end',
                    }}><Icon name={'arrow-forward'} color={GREEN_COLOR} size={50}/>
                    </Ripple>
                </SafeAreaView>
        </View>
    );
};
