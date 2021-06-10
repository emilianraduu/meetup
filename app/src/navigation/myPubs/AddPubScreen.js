import React, {useEffect, useState} from 'react';
import {
  Button,
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
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {lat, long, selectedPub, user} from '../../helpers/variables';
import {useMutation, useReactiveVar} from '@apollo/client';
import Config from 'react-native-config';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import CurrencyPicker from 'react-native-currency-picker';
import {Loader} from '../Loader';
import {CREATE_PUB} from '../../graphql/mutations/Pub';
import {PubRoute} from '../../helpers/routes';
import {client} from '../../graphql';
import {MY_PUBS_QUERY, PUBS_QUERY} from '../../graphql/queries/Pubs';

const AddPubScreen = ({navigation}) => {
  const latitude = useReactiveVar(lat);
  const longitude = useReactiveVar(long);
  const [images, setImages] = useState([]);
  const [marker, setMarker] = useState(undefined);
  const [values, setValues] = useState(undefined);
  const [errorString, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [createPub, {data, loading, error, called}] = useMutation(CREATE_PUB);
  const usr = useReactiveVar(user);
  const {top} = useSafeAreaInsets();
  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords: {latitude: lt, longitude: lg}}) => {
        lat(lt);
        long(lg);
      },
    );
  }, []);
  const onInputChange = ({key, value}) => {
    if (errorString !== '') {
      setError('');
    }
    setValues({...values, [key]: value});
  };

  const onSubmit = async () => {
    const firebaseUrls = [];
    setIsLoading(true);
    for (const index in images) {
      const reference = storage().ref(values.name + '/' + images[index].name);
      const firebase = await reference.putFile(images[index].uri);
      firebaseUrls.push(firebase.metadata.fullPath);
    }
    await createPub({
      variables: {
        latitude: marker.latitude,
        longitude: marker.longitude,
        name: values.name,
        images: firebaseUrls,
        address: values.address,
        currency: values.currency,
      },
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (data?.createPub) {
      selectedPub(data?.createPub);
      const d = client.readQuery({query: MY_PUBS_QUERY});
      client.writeQuery({
        query: MY_PUBS_QUERY,
        data: {myPubs: [...d.myPubs, data?.createPub]},
      });
      navigation.goBack();
      navigation.navigate(PubRoute);
    }
    if (error && called) {
      console.log(JSON.stringify(error));
    }
  }, [data, error, called]);
  const onPhotoPress = () => {
    launchImageLibrary({mediaType: 'photo'}, async ({assets}) => {
      const name = assets?.[0].fileName;
      const uri = assets?.[0].uri;
      setImages([...images, {name, uri}]);
    });
  };

  // console.log(images);

  return (
    <View style={{...style.content, paddingTop: top}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.section}>
          {/*<Loader loading={isLoading} />*/}
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
            <TextInput
              placeholder={'name'}
              onChange={(e) =>
                onInputChange({key: 'name', value: e.nativeEvent.text})
              }
            />
          </View>
        </View>
        <View>
          <View>
            <Text>Address</Text>
            <TextInput
              placeholder={'address'}
              onChange={(e) =>
                onInputChange({key: 'address', value: e.nativeEvent.text})
              }
            />
          </View>
        </View>
        <View>
          <View>
            <Text>Currency</Text>
            <CurrencyPicker
              enable={true}
              darkMode={false}
              currencyCode={'EUR'}
              showFlag={true}
              showCurrencyName={true}
              showCurrencyCode={true}
              onSelectCurrency={(data) => {
                onInputChange({key: 'email', value: data.code});
              }}
              onOpen={() => {
                console.log('Open');
              }}
              onClose={() => {
                console.log('Close');
              }}
              showNativeSymbol={true}
              showSymbol={false}
              containerStyle={{
                container: {},
                flagWidth: 25,
                currencyCodeStyle: {},
                currencyNameStyle: {},
                symbolStyle: {},
                symbolNativeStyle: {},
              }}
              modalStyle={{
                container: {},
                searchStyle: {},
                tileStyle: {},
                itemStyle: {
                  itemContainer: {},
                  flagWidth: 25,
                  currencyCodeStyle: {},
                  currencyNameStyle: {},
                  symbolStyle: {},
                  symbolNativeStyle: {},
                },
              }}
              title={'Currency'}
              searchPlaceholder={'Search'}
              showCloseButton={true}
              showModalTitle={true}
            />
          </View>
        </View>
        <View>
          <View>
            {latitude && longitude && (
              <MapView
                style={{height: 200}}
                onPress={async ({
                  nativeEvent: {
                    coordinate: {
                      latitude: pressedLatitude,
                      longitude: pressedLongitude,
                    },
                  },
                }) => {
                  setMarker({
                    latitude: pressedLatitude,
                    longitude: pressedLongitude,
                  });
                }}
                initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: 0.122,
                  longitudeDelta: 0.1421,
                }}>
                {marker && <Marker coordinate={marker} />}
              </MapView>
            )}
          </View>
          <View>
            <View>
              <Text>Images</Text>
              {/*<Swiper*/}
              {/*  showsButtons={false}*/}
              {/*  bounces={true}*/}
              {/*  removeClippedSubviews={false}*/}
              {/*  loop={false}*/}
              {/*  showsPagination={false}*/}
              {/*  containerStyle={{*/}
              {/*    width: '100%',*/}
              {/*    height: 200,*/}
              {/*    shadowColor: '#000',*/}
              {/*    shadowOffset: {*/}
              {/*      width: 0,*/}
              {/*      height: 7,*/}
              {/*    },*/}
              {/*    shadowOpacity: 0.61,*/}
              {/*    shadowRadius: 9.11,*/}
              {/*  }}>*/}
              {images.length > 0 &&
                images.map((img) => (
                  <Image
                    source={{uri: img.uri}}
                    style={{
                      height: 20,
                      width: 20,
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
                  height: 20,
                  width: 20,
                  backgroundColor: theme.dark,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={'add-circle'} size={70} color={theme.white} />
              </TouchableOpacity>
              {/*</Swiper>*/}
            </View>
          </View>
        </View>
        <Button title={'Submit'} onPress={onSubmit} />
      </ScrollView>
    </View>
  );
};

const style = {
  content: {backgroundColor: theme.white, flexGrow: 1},
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
