import React from 'react';
import {Text, View} from 'react-native';
import {DARK_COLOR, GREEN_COLOR} from '../../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {loginUser} from '../../helpers/actions/UserActions';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {AccessToken, GraphRequest, LoginManager} from 'react-native-fbsdk';
import {lightVibration} from '../../helpers/vibrations';

const LoginScreen = ({navigation, loginUser, permissionArray}) => {
    console.log(permissionArray)
    const initUser = (token) => {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=' + token)
            .then((response) => {
                response.json().then((json) => {
                    console.log(json);
                });
            })
            .catch(() => {
                console.log('ERROR GETTING DATA FROM FACEBOOK');
            });
    };
    const fbLogin = () => {
        lightVibration()
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login was cancelled');
                } else {
                    console.log(result);
                    let req = new GraphRequest('/me', {
                        httpMethod: 'GET',
                        version: 'v2.5',
                        parameters: {
                            'fields': {
                                'string': 'email,name,friends',
                            },
                        },
                    }, (err, res) => {
                        console.log(err, res);
                    });
                    console.log(req);
                    AccessToken.getCurrentAccessToken().then((accessToken) => initUser(accessToken.accessToken));
                    navigation.navigate('CameraScreen');
                }
            },
            function (error) {
                console.log('Login failed with error: ' + error);
            },
        );
    };
    const appleLogin = async () => {
        lightVibration()
        navigation.navigate('CameraScreen');
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
        if (credentialState === appleAuth.State.AUTHORIZED) {
        }
    };
    const googleLogin = async () => {
        lightVibration()
        try {
            GoogleSignin.configure();
            try {
                await GoogleSignin.hasPlayServices();
                const userInfo = await GoogleSignin.signIn();
                console.log(userInfo);
                navigation.navigate('CameraScreen');
            } catch (error) {
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                } else if (error.code === statusCodes.IN_PROGRESS) {
                } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                } else {
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={{backgroundColor: DARK_COLOR, flex: 1}}>
            <SafeAreaView style={{padding: 20, paddingBottom: 0, flexDirection: 'row'}}>
                <Ripple style={{alignSelf: 'center', marginRight: 10}} onPress={() => {
                    lightVibration()
                    navigation.goBack();
                }}>
                    <Icon name={'arrow-back'} color={GREEN_COLOR} size={30}/>
                </Ripple>
                <Text
                    style={{fontSize: 60, color: GREEN_COLOR, fontWeight: 'bold'}}>Sign in</Text>
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
                <Ripple rippleColor={GREEN_COLOR} onPress={fbLogin} style={{
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
                <Ripple rippleColor={DARK_COLOR} onPress={googleLogin} style={{
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
                <Ripple rippleColor={DARK_COLOR} onPress={appleLogin} style={{
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
export default connect((state) => ({permissionArray: state.permissions.permissionArray}), {loginUser})(LoginScreen);

