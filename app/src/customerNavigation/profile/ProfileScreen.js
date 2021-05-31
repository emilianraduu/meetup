import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ripple from 'react-native-material-ripple';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {Loader} from '../Loader';
import FastImage from 'react-native-fast-image';
import {theme} from '../../helpers/constants';
import {
  PermissionsRoute,
  PersonalRoute,
  ProfileNotificationsRoute,
} from '../../helpers/routes';
import {isLoggedIn} from '../../helpers/variables';
import {useReactiveVar} from '@apollo/client';
import {user} from '../../helpers/variables';

const ProfileScreen = ({navigation}) => {
  const [showLogout, setShowLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const usr = useReactiveVar(user);

  const logout = async () => {
    isLoggedIn(undefined);
    AsyncStorage.removeItem('accessToken');
    setShowLogout(false);
  };
  const goToNotif = () => {
    navigation.navigate(ProfileNotificationsRoute);
  };
  const goToPerm = () => {
    navigation.navigate(PermissionsRoute);
  };
  const goToPers = () => {
    navigation.navigate(PersonalRoute);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader loading={loading} />
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View
          style={{
            padding: 20,
            borderBottomWidth: 5,
            borderBottomColor: 'rgba(0,0,0,0.05)',
          }}>
          <Text
            style={{
              fontSize: 34,
              fontWeight: 'bold',
            }}>
            Profile
          </Text>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            {usr?.photo ? (
              <FastImage
                source={{uri: usr.photo}}
                style={{width: 50, height: 50, borderRadius: 50}}
              />
            ) : (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  overflow: 'hidden',
                  backgroundColor: theme.red,
                }}>
                <Ionicons name={'person'} size={50} color={theme.white} />
              </View>
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(PersonalRoute);
              }}
              style={{justifyContent: 'center', marginLeft: 20}}>
              <View>
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                  {usr?.firstName} {usr?.lastName}
                </Text>
                <Text style={{fontSize: 14, color: theme.grey}}>
                  See profile details
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <View style={{padding: 20, paddingBottom: 0}}>
            <Text style={{fontSize: 10, fontWeight: '700', color: theme.red}}>
              Account settings
            </Text>
          </View>
          <View>
            <Ripple onPress={goToPers} style={style.nav}>
              <Text>Personal information</Text>
              <Ionicons name={'person-outline'} color={theme.dark} size={20} />
            </Ripple>
            <Ripple onPress={goToNotif} style={style.nav}>
              <Text>Notifications</Text>
              <Ionicons
                name={'notifications-outline'}
                color={theme.dark}
                size={20}
              />
            </Ripple>
            <Ripple onPress={goToPerm} style={style.nav}>
              <Text>Permissions</Text>
              <Ionicons
                name={'location-outline'}
                color={theme.dark}
                size={20}
              />
            </Ripple>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <View style={{padding: 20, paddingBottom: 0}}>
            <Text style={{fontSize: 10, fontWeight: '700', color: theme.red}}>
              Tools
            </Text>
          </View>
          <View>
            <Ripple onPress={goToPers} style={style.nav}>
              <Text>Siri settings</Text>
              <Ionicons name={'ios-search'} color={theme.dark} size={20} />
            </Ripple>
            <Ripple onPress={goToNotif} style={style.nav}>
              <Text>How meetup works</Text>
              <Ionicons name={'git-network'} color={theme.dark} size={20} />
            </Ripple>
            <Ripple onPress={goToPerm} style={style.nav}>
              <Text>Get help</Text>
              <Ionicons name={'help-circle'} color={theme.dark} size={20} />
            </Ripple>
          </View>
        </View>
        <Ripple
          onPress={() => {
            setShowLogout(true);
          }}
          style={style.nav}>
          <Text style={{color: theme.dark}}>Logout</Text>
          <Icon name={'login'} color={theme.dark} size={20} />
        </Ripple>
        <Modal
          isVisible={showLogout}
          animationInTiming={1}
          animationOut={'fadeOut'}
          style={style.modal}
          onBackdropPress={() => {
            setShowLogout(false);
          }}>
          <View style={style.animation}>
            <LottieView
              source={require('../../assets/animations/logout.json')}
              style={{width: 300}}
              autoPlay
              loop={false}
            />

            <Ripple
              rippleColor={theme.white}
              onPress={logout}
              style={style.button}>
              <Ionicons name={'log-in-outline'} color={theme.white} size={20} />
              <Text style={style.text}>Logout</Text>
            </Ripple>
          </View>
        </Modal>
        <View style={style.versionWrapper}>
          <Text>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  versionWrapper: {justifyContent: 'center', alignItems: 'center', padding: 20},
  button: {
    backgroundColor: theme.dark,
    borderRadius: 5,
    width: 250,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  text: {color: theme.white, marginLeft: 10},
  animation: {
    backgroundColor: '#fff',
    margin: 40,
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
  },
  modal: {flex: 1, margin: 0},
  nav: {
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
  },
});
export default ProfileScreen;
