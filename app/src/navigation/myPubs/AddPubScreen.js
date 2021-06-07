import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ripple from 'react-native-material-ripple';
import {lightVibration} from '../../helpers/vibrations';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {lat, long} from '../../helpers/variables';
import {useReactiveVar} from '@apollo/client';
import Geocoder from 'react-native-geocoding';
import Config from 'react-native-config';
import Swiper from 'react-native-swiper';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const AddPubScreen = ({navigation}) => {
  const latitude = useReactiveVar(lat);
  const longitude = useReactiveVar(long);
  const [images, setImages] = useState([]);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords: {latitude: lt, longitude: lg}}) => {
        lat(lt);
        long(lg);
      },
    );
    Geocoder.init(Config.GOOGLE_MAPS_API);
  }, []);
  const onPhotoPress = () => {
    launchImageLibrary({mediaType: 'photo'}, async ({assets}) => {
      const name = assets?.[0].fileName;
      const uri = assets?.[0].uri;
      // const reference = storage().ref(name);
      // const firebase = await reference.putFile(uri);
      setImages([...images, {name, uri}]);
    });
  };

  return (
    <SafeAreaView style={style.content}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.content}
        style={style.content}>
        <View style={style.section}>
          <Ripple
            style={style.back}
            onPress={() => {
              lightVibration();
              navigation.goBack();
            }}>
            <Icon name={'arrow-back'} color={theme.dark} size={25} />
          </Ripple>
          <View style={style.title}>
            <Text style={style.titleText}>Add Pub</Text>
          </View>
        </View>
        <View>
          <View>
            <Text>Name</Text>
            <TextInput placeholder={'name'} />
          </View>
        </View>
        <View>
          <View>
            <Text>Address</Text>
            <TextInput placeholder={'address'} />
          </View>
        </View>
        <View>
          <View>
            <Text>Currency</Text>
            <TextInput placeholder={'currency'} />
          </View>
        </View>
        <View>
          <View>
            <Text>Address</Text>
            <Text>''</Text>
            {latitude && longitude && (
              <MapView
                style={{height: 200}}
                showsUserLocation={true}
                onPress={async (e) => {
                  console.log(
                    await Geocoder.from(
                      e.nativeEvent.coordinate.latitude,
                      e.nativeEvent.coordinate.longitude,
                    ),
                  );
                }}
                initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: 0.122,
                  longitudeDelta: 0.1421,
                }}
              />
            )}
          </View>
          <View>
            <View>
              <Text>Images</Text>
              <Swiper
                showsButtons={false}
                bounces={true}
                removeClippedSubviews={false}
                loop={false}
                showsPagination={false}
                containerStyle={{
                  width: '100%',
                  height: 200,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 7,
                  },
                  shadowOpacity: 0.61,
                  shadowRadius: 9.11,
                }}>
                {images.length > 0 &&
                  images.map((img) => (
                    <Image
                      source={{uri: img.uri}}
                      style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: theme.dark,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    />
                  ))}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onPhotoPress}
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: theme.dark,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name={'add-circle'} size={70} color={theme.white} />
                </TouchableOpacity>
              </Swiper>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = {
  content: {backgroundColor: theme.white},
  section: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  titleText: {fontSize: 34, fontWeight: 'bold'},
  back: {marginRight: 10},
};

export default AddPubScreen;
