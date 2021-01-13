import {ScrollView, Text, View} from 'react-native';
import React, {useRef} from 'react';
import Ripple from 'react-native-material-ripple';
import {DARK_COLOR, GREEN_COLOR} from '../../helpers/constants';
import {connect} from 'react-redux'
import {logoutUser} from '../../helpers/actions/UserActions';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from "lottie-react-native";
import * as Progress from "react-native-progress";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = ({logoutUser}) => {
    const LottieRef = useRef(null);
    return (
        <View style={{backgroundColor: GREEN_COLOR, flex: 1}}>
            <View style={{backgroundColor: DARK_COLOR, borderBottomRightRadius: 40, borderBottomLeftRadius: 40}}>
                <SafeAreaView style={{padding: 20, flexDirection: 'row'}}>
                    <Ripple onPress={() => {
                        LottieRef.current.play();
                    }} style={{width: 100, height: 100, backgroundColor: GREEN_COLOR, borderRadius: 500}}>
                        <LottieView ref={LottieRef} source={require('../../assets/animations/burger.json')}
                                    style={{width: '100%', height: '100%'}} loop={false} progress={undefined}/>
                    </Ripple>
                    <View style={{alignSelf: 'center', marginLeft: 10, flex:1}}>
                        <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>Radu Emilian</Text>
                        <Text style={{color: '#fff', fontSize: 10, fontWeight: '200'}}>Burger - Level 5</Text>
                        <View style={{width: '100%', }}>
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
            <ScrollView contentContainerStyle={{flex: 1, padding: 20}}
                        style={{backgroundColor: GREEN_COLOR, minHeight: 250}}>
                <Ripple rippleColor={'#fff'} onPress={logoutUser} style={{
                    width: 250,
                    height: 50,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    alignSelf: 'center',
                }}><Icon name={'login'} color={DARK_COLOR} size={20}/>
                    <Text style={{color: DARK_COLOR, marginLeft: 10}}>Logout</Text>
                </Ripple>
            </ScrollView>
        </View>
    );
};
export default connect((state)=>({}),{logoutUser})(ProfileScreen)
