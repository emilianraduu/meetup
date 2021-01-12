import React from 'react';
import {Text, View} from 'react-native';
import {DARK_COLOR, GREEN_COLOR} from '../../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
            <SafeAreaView style={{padding: 20, paddingBottom: 0}}>
                <Text style={{fontSize: 60, color: GREEN_COLOR, fontWeight: 'bold'}}>Login</Text>
            </SafeAreaView>
            <View style={{
                backgroundColor: GREEN_COLOR,
                flex: 1,
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
                }}><Icon name={'facebook'} color={'#fff'} size={30}/>
                    <Text style={{color: '#fff', marginLeft: 10}}>Login with
                        facebook</Text></Ripple>
                <Ripple rippleColor={GREEN_COLOR} style={{
                    backgroundColor: DARK_COLOR,
                    borderRadius: 5,
                    width: 250,
                    height: 60,
                    marginBottom: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    alignSelf: 'center',
                }}><Icon name={'facebook'} color={GREEN_COLOR} size={50}/></Ripple>
                <Ripple rippleColor={GREEN_COLOR} style={{
                    backgroundColor: DARK_COLOR,
                    borderRadius: 5,
                    width: 250,
                    marginBottom: 10,
                    height: 60,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    alignSelf: 'center',
                }}><Icon name={'facebook'} color={GREEN_COLOR} size={50}/></Ripple>
            </SafeAreaView>
        </View>
    );
};
export default connect((state) => ({}), {loginUser})(LoginScreen);
