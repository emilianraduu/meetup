import {ScrollView, Text, View, AsyncStorage} from 'react-native';
import React, {useRef, useState} from 'react';
import Ripple from 'react-native-material-ripple';
import {API_URL, DARK_COLOR, GREEN_COLOR} from '../../helpers/constants';
import {connect} from 'react-redux';
import {logoutUser} from '../../helpers/actions/UserActions';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import branch from 'react-native-branch';
import Modal from 'react-native-modal';
import {Loader} from '../Loader';

const ProfileScreen = ({logoutUser, navigation, user}) => {
    const [showLogout, setShowLogout] = useState(false);
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        setShowLogout(false);
        await AsyncStorage.removeItem('token')
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}api/logout`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                },
                method: 'POST',
            });
            const body = await response.json();
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
        logoutUser();
    };
    const goToNotif = () => {
        navigation.navigate('NotificationsScreen');
    };
    const goToPerm = () => {
        navigation.navigate('PermissionsScreen');
    };
    const goToPers = () => {
        navigation.navigate('PersonalScreen');
    };
    const LottieRef = useRef(null);
    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <Loader loading={loading}/>

            <View style={{backgroundColor: DARK_COLOR, borderBottomRightRadius: 40, borderBottomLeftRadius: 40}}>
                <SafeAreaView style={{padding: 20, flexDirection: 'row'}}>
                    <Ripple onPress={() => {
                        LottieRef.current.play();
                    }} style={{width: 100, height: 100, backgroundColor: GREEN_COLOR, borderRadius: 500}}>
                        <LottieView ref={LottieRef} source={require('../../assets/animations/burger.json')}
                                    style={{width: '100%', height: '100%'}} loop={false} progress={undefined}/>
                    </Ripple>
                    <View style={{alignSelf: 'center', marginLeft: 10, flex: 1}}>
                        <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>{user.family_name} {user.given_name}</Text>
                        <Text style={{color: '#fff', fontSize: 10, fontWeight: '200'}}>Burger - Level 5</Text>
                        <View style={{width: '100%'}}>
                            <Progress.Bar width={null} animated={true} progress={0.5} color={'rgba(122,216,185,100)'}
                                          style={{marginTop: 5, marginBottom: 2}}/>
                        </View>
                        <View style={{width: '100%', justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text style={{color: '#fff', fontSize: 10, fontWeight: '200'}}>0</Text>
                            <Text style={{color: '#fff', fontSize: 10, fontWeight: '200'}}>500</Text>
                        </View>

                    </View>
                </SafeAreaView>
            </View>
            <ScrollView contentContainerStyle={{flex: 1}}>
                <View style={{marginBottom: 20}}>
                    <View style={{padding: 20, paddingBottom: 0}}>
                        <Text style={{fontSize: 10, fontWeight: '700', color: '#d3d3d3'}}>Account settings</Text>
                    </View>
                    <View>
                        <Ripple onPress={goToPers} style={{
                            width: '100%',
                            paddingLeft: 20,
                            paddingRight: 20,
                            height: 50,
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: '#d3d3d3',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            overflow: 'hidden',
                            alignSelf: 'center',
                        }}>
                            <Text>Personal information</Text>
                            <Ionicon name={'person-outline'} color={DARK_COLOR} size={20}/>
                        </Ripple>
                        <Ripple onPress={goToNotif} style={{
                            width: '100%',
                            paddingLeft: 20,
                            paddingRight: 20,
                            height: 50,
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: '#d3d3d3',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            overflow: 'hidden',
                            alignSelf: 'center',
                        }}>
                            <Text>Notifications</Text>
                            <Ionicon name={'notifications-outline'} color={DARK_COLOR} size={20}/>
                        </Ripple>
                        <Ripple onPress={goToPerm} style={{
                            width: '100%',
                            paddingLeft: 20,
                            paddingRight: 20,
                            height: 50,
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: '#d3d3d3',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            overflow: 'hidden',
                            alignSelf: 'center',
                        }}>
                            <Text>Permissions</Text>
                            <Ionicon name={'location-outline'} color={DARK_COLOR} size={20}/>
                        </Ripple>
                    </View>

                </View>
                <Ripple onPress={() => {
                    setShowLogout(true);
                }} style={{
                    width: '100%',
                    paddingLeft: 20,
                    paddingRight: 20,
                    height: 50,
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#d3d3d3',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                    alignSelf: 'center',
                }}>
                    <Text style={{color: DARK_COLOR}}>Logout</Text>
                    <Icon name={'login'} color={DARK_COLOR} size={20}/>
                </Ripple>
                <Modal isVisible={showLogout} animationInTiming={1} animationOut={'fadeOut'}
                       style={{flex: 1, margin: 0}} onBackdropPress={() => {
                    setShowLogout(false);
                }}>
                    <View style={{
                        backgroundColor: '#fff',
                        margin: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        padding: 20,
                    }}>
                        <LottieView source={require('../../assets/animations/logout.json')} style={{width: 300}}
                                    autoPlay loop={false}/>

                        <Ripple rippleColor={'#fff'} onPress={logout} style={{
                            backgroundColor: DARK_COLOR,
                            borderRadius: 5,
                            width: 250,
                            height: 50,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            alignSelf: 'center',
                        }}><Ionicons name={'log-in-outline'} color={'#fff'} size={20}/>
                            <Text style={{color: '#fff', marginLeft: 10}}>Logout</Text>
                        </Ripple>
                    </View>
                </Modal>
                <View style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
                    <Text>Version 1.0.0</Text>
                </View>
            </ScrollView>
        </View>
    );
};
export default connect((state) => ({
    user: state.user.user,
}), {logoutUser})(ProfileScreen);
