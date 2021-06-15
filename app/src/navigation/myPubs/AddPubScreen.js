import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import {theme} from '../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ripple from 'react-native-material-ripple';
import {lightVibration} from '../../helpers/vibrations';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';
import {lat, long, selectedPub} from '../../helpers/variables';
import {useMutation, useReactiveVar} from '@apollo/client';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import CurrencyPicker from 'react-native-currency-picker';
import {CREATE_PUB} from '../../graphql/mutations/Pub';
import {PubRoute} from '../../helpers/routes';
import {client} from '../../graphql';
import {MY_PUBS_QUERY} from '../../graphql/queries/Pubs';
import LocationModal from './LocationModal';
import {Loader} from '../Loader';

const AddPubScreen = ({navigation}) => {
  const latitude = useReactiveVar(lat);
  const longitude = useReactiveVar(long);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [marker, setMarker] = useState(undefined);
  const [values, setValues] = useState({
    address: '',
    reservationTime: '',
    name: '',
    currency: 'RON',
  });
  const [errorString, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [createPub, {data, loading, error, called}] = useMutation(CREATE_PUB);
  const {top, bottom} = useSafeAreaInsets();
  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords: {latitude: lt, longitude: lg}}) => {
        lat(lt);
        long(lg);
      },
    );
  }, []);
  useEffect(() => {
    if (marker && marker.latitude && marker.longitude) {
      fetch(
        `https://eu1.locationiq.com/v1/reverse.php?key=pk.4ffc58640549bc475e052bdc44168b7f&lat=${marker.latitude}&lon=${marker.longitude}&format=json`,
      ).then((e) =>
        e
          .json()
          .then((k) => onInputChange({value: k?.display_name, key: 'address'})),
      );
    }
  }, [marker]);
  const onInputChange = ({key, value}) => {
    if (errorString !== '') {
      setError('');
    }
    setValues({...values, [key]: value});
  };

  const onSubmit = async () => {
    try {
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
          reservationTime: Number(values.reservationTime),
        },
      });
      setIsLoading(false);
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
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
      if (assets[0]) {
        const name = assets?.[0].fileName;
        const uri = assets?.[0].uri;
        setImages([...images, {name, uri}]);
      }
    });
  };
  const goBack = () => {
    lightVibration();
    navigation.goBack();
  };

  const disabled =
    images.length < 1 &&
    !values.address &&
    !values.reservationTime &&
    !values.name &&
    !marker;
  return (
    <View style={{...style.content, paddingTop: top}}>
      <View style={style.section}>
        <Loader loading={isLoading} />
        <Ripple style={style.back} onPress={goBack}>
          <Icon name={'arrow-back'} color={theme.dark} size={25} />
        </Ripple>
        <View style={style.title}>
          <Text style={style.titleText}>Add Pub</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={style.scrollView}>
        <View style={style.wrapper}>
          <View style={style.field}>
            <Text style={style.fieldTitle}>Location name</Text>
            <TextInput
              style={style.input}
              placeholder={'Insert location name'}
              placeholderTextColor={theme.grey}
              onChange={(e) =>
                onInputChange({key: 'name', value: e.nativeEvent.text})
              }
            />
          </View>
          <View style={style.field}>
            <Text style={style.fieldTitle}>Reservation time</Text>
            <Text style={style.fieldSubtitle}>
              This is the amount of time that an average reservation takes. This
              can be changed later
            </Text>
            <TextInput
              style={style.input}
              keyboardType={'numeric'}
              placeholder={'Insert reservation time'}
              value={values?.reservationTime}
              placeholderTextColor={theme.grey}
              onChange={({nativeEvent: {text}}) => {
                if (Number(text) || text.length === 0) {
                  onInputChange({
                    key: 'reservationTime',
                    value: text,
                  });
                }
              }}
            />
          </View>
          <View style={style.field}>
            <Text style={style.fieldTitle}>Address</Text>
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={style.press}>
              <Text style={{color: theme.red}}>
                {!!values.address ? values.address : 'Pick the address'}
              </Text>
              {!!values.address && <Icon name={'edit'} color={theme.red} />}
            </TouchableOpacity>
          </View>
          <View style={style.field}>
            <Text style={style.fieldTitle}>Currency</Text>
            <CurrencyPicker
              enable={true}
              darkMode={false}
              currencyCode={values?.currency}
              showFlag={true}
              showCurrencyName={true}
              showCurrencyCode={true}
              onSelectCurrency={({code}) => {
                onInputChange({key: 'currency', value: code});
              }}
              showNativeSymbol={true}
              showSymbol={false}
              containerStyle={{
                currencyCodeStyle: {marginLeft: 0},
              }}
              title={'Currency'}
              searchPlaceholder={'Search'}
              showCloseButton={true}
              showModalTitle={true}
            />
          </View>
          <View style={style.field}>
            <Text style={style.fieldTitle}>Images</Text>
            <View style={style.imageWrapper}>
              {images.length > 0 &&
                images.map((img) => (
                  <Image source={{uri: img.uri}} style={style.image} />
                ))}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPhotoPress}
                style={style.image}>
                <Icon name={'add-circle'} size={70} color={theme.dark} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          disabled={disabled}
          style={{
            ...style.cta,
            backgroundColor: disabled ? theme.black : theme.red,
          }}
          onPress={onSubmit}>
          <Text style={style.ctaText}>Submit</Text>
        </TouchableOpacity>
        <LocationModal
          bottom={bottom}
          longitude={longitude}
          latitude={latitude}
          marker={marker}
          onChangeInput={onInputChange}
          setMarker={setMarker}
          setShowModal={setShowModal}
          showModal={showModal}
          top={top}
          values={values}
        />
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
  scrollView: {flex: 1},
  wrapper: {paddingHorizontal: 20, flex: 1, marginBottom: 40},
  field: {marginBottom: 20},
  fieldTitle: {fontWeight: '600'},
  input: {
    borderBottomColor: theme.grey,
    borderBottomWidth: 2,
    paddingVertical: 10,
  },
  press: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    height: (Dimensions.get('window').width - 55) / 2,
    width: (Dimensions.get('window').width - 55) / 2,
    borderColor: theme.dark,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    margin: 3,
    alignItems: 'center',
  },
  cta: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 50,
    alignSelf: 'center',
  },
  ctaText: {
    color: theme.white,
    fontWeight: 'bold',
  },
  fieldSubtitle: {
    fontSize: 11,
    color: theme.grey,
  },
};

export default AddPubScreen;
