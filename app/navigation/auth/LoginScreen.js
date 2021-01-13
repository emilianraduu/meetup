import React from 'react';
import {Text, View} from 'react-native';
import {DARK_COLOR, GREEN_COLOR} from '../../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {checkPermissions} from '../../helpers/permissions';
import {connect} from 'react-redux';
import {loginUser} from '../../helpers/actions/UserActions';

const LoginScreen = ({navigation, loginUser}) => {
    const login = () => {
        checkPermissions().then((hasPermissions) => {
            navigation.navigate('CameraScreen');
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
                <Text
                    style={{fontSize: 60, color: GREEN_COLOR, fontWeight: 'bold'}}>Login</Text>
            </SafeAreaView>
            <View style={{
                backgroundColor: GREEN_COLOR,
                borderTopRightRadius: 60,
                padding: 20,
                borderBottomRightRadius: 60,
                marginRight: 20,
            }}>

                <LottieView source={require('../../assets/animations/burger.json')} autoPlay loop
                            style={{width: 300, alignSelf: 'center'}}/>
            </View>
            <SafeAreaView style={{alignSelf: 'flex-end', width: '100%'}}>
                <Ripple rippleColor={GREEN_COLOR} onPress={login} style={{
                    backgroundColor: '#3b5998',
                    borderRadius: 5,
                    width: 250,
                    height: 50,
                    marginBottom: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    alignSelf: 'center',
                }}><Ionicons name={'logo-facebook'} color={'#fff'} size={20}/>
                    <Text style={{color: '#fff', marginLeft: 10}}>Sign in with Facebook</Text>
                </Ripple>
                <Ripple rippleColor={DARK_COLOR} onPress={login} style={{
                    backgroundColor: '#dd4b39',
                    borderRadius: 5,
                    width: 250,
                    height: 50,
                    marginBottom: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    alignSelf: 'center',
                }}><Ionicons name={'logo-google'} color={'#fff'} size={20}/>
                    <Text style={{color: '#fff', marginLeft: 10}}>Sign in with Google</Text>
                </Ripple>
                <Ripple rippleColor={DARK_COLOR} onPress={login} style={{
                    backgroundColor: '#000',
                    borderRadius: 5,
                    width: 250,
                    height: 50,
                    marginBottom: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    alignSelf: 'center',
                }}><Ionicons name={'logo-apple'} color={'#fff'} size={20}/>
                    <Text style={{color: '#fff', marginLeft: 10}}>Sign in with Apple</Text>
                </Ripple>

            </SafeAreaView>
        </View>
    );
};
export default connect((state) => ({}), {loginUser})(LoginScreen);
