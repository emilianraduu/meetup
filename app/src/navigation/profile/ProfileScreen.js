import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  NotificationRoute,
  PermissionsRoute,
  PersonalRoute,
  SiriRoute,
} from '../../helpers/routes';
import {isLoggedIn, token, user} from '../../helpers/variables';
import {useMutation, useReactiveVar} from '@apollo/client';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {UPDATE_PHOTO_MUTATION} from '../../graphql/mutations/User';
import {supportsSiriButton} from 'react-native-siri-shortcut/AddToSiriButton';

const ProfileScreen = ({navigation}) => {
  const [showLogout, setShowLogout] = useState(false);
  const [photo, setPhoto] = useState('');
  const usr = useReactiveVar(user);
  const [updateUserPhoto, {loading, data, error}] = useMutation(
    UPDATE_PHOTO_MUTATION,
  );

  useEffect(() => {
    const getUrl = async () => {
      return await storage().ref(usr?.photo).getDownloadURL();
    };
    if (usr?.photo) {
      getUrl().then((url) => {
        setPhoto(url);
      });
    }
  }, [usr]);

  useEffect(() => {
    if (data?.updateUser) {
      user(data.updateUser);
    }
    if (error) {
      alert(error);
    }
  }, [data, error]);
  const logout = async () => {
    isLoggedIn(undefined);
    await AsyncStorage.removeItem('accessToken');
    token(undefined);
    setShowLogout(false);
  };
  const goTo = (page, options) => {
    navigation.navigate(page, options);
  };

  const onPhotoPress = () => {
    launchImageLibrary({mediaType: 'photo'}, async ({assets}) => {
      const reference = storage().ref(assets?.[0].fileName);
      const r = await reference.putFile(assets?.[0].uri);
      if (r && usr) {
        await updateUserPhoto({
          variables: {photo: assets?.[0].fileName, id: usr?.id},
        });
      }
    });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader loading={loading} />
      <ScrollView>
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
            <TouchableOpacity onPress={onPhotoPress}>
              {photo ? (
                <FastImage
                  source={{uri: photo}}
                  style={{width: 70, height: 70, borderRadius: 50}}
                />
              ) : (
                <Ionicons name={'person-circle'} size={70} color={theme.red} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(PersonalRoute);
              }}
              style={{justifyContent: 'center', marginLeft: 20}}>
              <View>
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                  {usr?.firstName && usr?.lastName
                    ? `${usr.firstName} ${usr.lastName}`
                    : 'Set your name'}
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
            <Ripple onPress={() => goTo(PersonalRoute)} style={style.nav}>
              <Text>Personal information</Text>
              <Ionicons name={'person-outline'} color={theme.dark} size={20} />
            </Ripple>
            <Ripple
              onPress={() => {
                goTo(NotificationRoute);
              }}
              style={style.nav}>
              <Text>Notifications</Text>
              <Ionicons
                name={'notifications-outline'}
                color={theme.dark}
                size={20}
              />
            </Ripple>
            <Ripple onPress={() => goTo(PermissionsRoute)} style={style.nav}>
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
            {supportsSiriButton && (
              <Ripple onPress={() => goTo(SiriRoute)} style={style.nav}>
                <Text>Siri settings</Text>
                <Ionicons name={'ios-search'} color={theme.dark} size={20} />
              </Ripple>
            )}
            <Ripple style={style.nav}>
              <Text>How meetup works</Text>
              <Ionicons name={'git-network'} color={theme.dark} size={20} />
            </Ripple>
            <Ripple style={style.nav}>
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
          style={style.modal}
          swipeDirection={'down'}
          onSwipeComplete={() => {
            setShowLogout(false);
          }}
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
    paddingVertical: 10,
    paddingHorizontal: 50,
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
