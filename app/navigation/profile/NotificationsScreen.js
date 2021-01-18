import React, {useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {DARK_COLOR, GREEN_COLOR} from '../../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ripple from 'react-native-material-ripple';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ToggleSwitch from 'toggle-switch-react-native';

export const NotificationsScreen = ({navigation}) => {

    const onPress = () => {
        async function requestUserPermission() {
            const authorizationStatus = await messaging().requestPermission();

            if (authorizationStatus) {
                console.log('Permission status:', authorizationStatus);
                navigation.navigate('HealthScreen');
            }
        }

        requestUserPermission();
    };

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{backgroundColor: DARK_COLOR, borderBottomLeftRadius: 40, borderBottomRightRadius: 40}}>
                <SafeAreaView style={{padding: 20, paddingBottom: 0, flexDirection: 'row'}}>
                    <Ripple style={{alignSelf: 'center', marginRight: 10}} onPress={() => {
                        const options = {
                            enableVibrateFallback: true,
                            ignoreAndroidSystemSettings: false,
                        };
                        ReactNativeHapticFeedback.trigger('impactLight', options);
                        navigation.goBack();
                    }}>
                        <Icon name={'arrow-back'} color={GREEN_COLOR} size={30}/>
                    </Ripple>
                    <Text style={{fontSize: 40, color: GREEN_COLOR, fontWeight: 'bold'}}>Notifications</Text>
                </SafeAreaView>
            </View>
            <ScrollView>
                <View style={{
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
                    <Text>Friend achievements</Text>
                    <ToggleSwitch isOn={true}
                                  size="medium"
                                  onToggle={isOn => console.log('changed to : ', isOn)}/>
                </View>
                <View style={{
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
                    <Text>Travel alert</Text>
                    <ToggleSwitch isOn={true}
                                  size="medium"
                                  onToggle={isOn => console.log('changed to : ', isOn)}/>
                </View>
                <View style={{
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
                    <Text>Monsters around</Text>
                    <ToggleSwitch isOn={true}
                                  size="medium"
                                  onToggle={isOn => console.log('changed to : ', isOn)}/>
                </View>
            </ScrollView>

        </View>
    );
};
