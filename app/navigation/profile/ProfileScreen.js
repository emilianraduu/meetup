import {ScrollView, Text, View} from 'react-native';
import React, {useRef} from 'react';
import Ripple from 'react-native-material-ripple';
import {DARK_COLOR, GREEN_COLOR} from '../../helpers/constants';
import {connect} from 'react-redux';
import {logoutUser} from '../../helpers/actions/UserActions';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import branch, { BranchEvent } from 'react-native-branch'

const ProfileScreen = ({logoutUser}) => {
    const shareLink = async ()=>{
        let branchUniversalObject = await branch.createBranchUniversalObject('canonicalIdentifier', {
            locallyIndex: true,
            title: 'Cool Content!',
            contentDescription: 'Cool Content Description',
            contentMetadata: {
                ratingAverage: 4.2,
                customMetadata: {
                    prop1: 'test',
                    prop2: 'abc'
                }
            }
        })
        let linkProperties = {
            feature: 'share',
        }

        let controlParams = {
            $desktop_url: 'http://desktop-url.com/monster/12345'
        }
        let {url} =  branchUniversalObject.generateShortUrl(linkProperties, controlParams)
        let shareOptions = { messageHeader: 'Check this out', messageBody: 'No really, check this out!' }
        let {channel, completed, error} = await branchUniversalObject.showShareSheet(shareOptions, linkProperties, controlParams)
    }
    const LottieRef = useRef(null);
    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <View style={{backgroundColor: DARK_COLOR, borderBottomRightRadius: 40, borderBottomLeftRadius: 40}}>
                <SafeAreaView style={{padding: 20, flexDirection: 'row'}}>
                    <Ripple onPress={() => {
                        LottieRef.current.play();
                    }} style={{width: 100, height: 100, backgroundColor: GREEN_COLOR, borderRadius: 500}}>
                        <LottieView ref={LottieRef} source={require('../../assets/animations/burger.json')}
                                    style={{width: '100%', height: '100%'}} loop={false} progress={undefined}/>
                    </Ripple>
                    <View style={{alignSelf: 'center', marginLeft: 10, flex: 1}}>
                        <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>Radu Emilian</Text>
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
                        <Ripple style={{
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
                        <Ripple onPress={shareLink} style={{
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
                        <Ripple style={{
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
                <Ripple onPress={logoutUser} style={{
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
                <View style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
                    <Text>Version 1.0.0</Text>
                </View>
            </ScrollView>
        </View>
    );
};
export default connect((state) => ({}), {logoutUser})(ProfileScreen);
