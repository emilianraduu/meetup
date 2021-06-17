import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme, user_status} from '../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import MapView, {Marker} from 'react-native-maps';
import {useMutation, useReactiveVar} from '@apollo/client';
import {lat, long, pubs, selectedPub, user} from '../../helpers/variables';
import CurrencyPicker from 'react-native-currency-picker';
import LocationModal from '../myPubs/LocationModal';
import Geolocation from '@react-native-community/geolocation';
import Config from 'react-native-config';
import {DELETE_PUB, UPDATE_PUB} from '../../graphql/mutations/Pub';
import {client} from '../../graphql';
import {MY_PUBS_QUERY, PUB_QUERY, PUBS_QUERY} from '../../graphql/queries/Pubs';
import {ExploreRoute} from '../../helpers/routes';

const PubAbout = ({navigation}) => {
  const {bottom, top} = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);
  const pub = useReactiveVar(selectedPub);
  const [values, setValues] = useState({
    address: pub.address,
    reservationTime: pub.reservationTime,
    name: pub.name,
    currency: pub.currency,
    visible: pub.visible,
  });
  const [updatePub, {data, error}] = useMutation(UPDATE_PUB);
  const [deletePub] = useMutation(DELETE_PUB);

  const latitude = useReactiveVar(lat);
  const longitude = useReactiveVar(long);
  const usr = useReactiveVar(user);
  const [marker, setMarker] = useState({
    latitude: pub.latitude,
    longitude: pub.longitude,
  });

  const isAdmin =
    usr?.status === user_status.admin &&
    Number(pub?.ownerId) === Number(usr.id);
  const onInputChange = ({key, value}) => {
    setValues({...values, [key]: value});
  };
  const {container, empty} = styles({
    bottom,
  });

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
        `https://eu1.locationiq.com/v1/reverse.php?key=${Config.LOCATION_KEY}&lat=${marker.latitude}&lon=${marker.longitude}&format=json`,
      ).then((e) =>
        e
          .json()
          .then((k) => onInputChange({value: k?.display_name, key: 'address'})),
      );
    }
  }, [marker]);
  const pubList = useReactiveVar(pubs);
  const removePub = async () => {
    const response = await deletePub({variables: {id: pub.id}});
    if (response.data) {
      const index = pubList.findIndex((p) => p.id === pub.id);
      let list = pubList;
      list.splice(index, 1);
      client.writeQuery({query: MY_PUBS_QUERY, data: list});
      while (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <BottomSheetScrollView contentContainerStyle={container}>
        <KeyboardAvoidingView
          behavior={'position'}
          keyboardVerticalOffset={170}
          enabled>
          {/*<LottieView*/}
          {/*  source={require('../../assets/animations/empty-stores.json')}*/}
          {/*  loop={true}*/}
          {/*  autoPlay={true}*/}
          {/*  style={empty}*/}
          {/*/>*/}
          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold'}}>Map location</Text>
            {isAdmin && (
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Text style={{color: theme.red, fontWeight: 'bold'}}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
          <MapView
            scrollEnabled={false}
            pitchEnabled={false}
            style={{height: 200, borderRadius: 20, overflow: 'hidden'}}
            initialRegion={{
              latitude: pub?.latitude,
              longitude: pub?.longitude,
              latitudeDelta: 0.122,
              longitudeDelta: 0.1421,
            }}>
            <Marker
              coordinate={{latitude: pub.latitude, longitude: pub.longitude}}
            />
          </MapView>
          <Text style={{fontWeight: 'bold', marginTop: 20}}>Address</Text>
          <Text style={{color: theme.red}}>{pub.address}</Text>
          {isAdmin && (
            <>
              <Text style={{fontWeight: 'bold', marginTop: 20}}>
                Visibility
              </Text>
              <Switch
                value={values.visible}
                onChange={() => {
                  onInputChange({key: 'visible', value: !values.visible});
                  updatePub({
                    variables: {id: pub.id, visible: !values.visible},
                  });
                  selectedPub({...pub, visible: !values.visible});
                  client.writeQuery({
                    query: PUB_QUERY,
                    data: {pub: {...pub, visible: !values.visible}},
                  });
                }}
              />
            </>
          )}
          <Text style={{fontWeight: 'bold', marginTop: 20}}>Currency</Text>
          {isAdmin ? (
            <CurrencyPicker
              enable={true}
              darkMode={false}
              currencyCode={values.currency}
              showFlag={true}
              showCurrencyName={true}
              showCurrencyCode={true}
              showNativeSymbol={true}
              showSymbol={false}
              containerStyle={{
                currencyCodeStyle: {marginLeft: 0},
              }}
              title={'Currency'}
              onSelectCurrency={({code}) => {
                onInputChange({key: 'currency', value: code});
                updatePub({variables: {id: pub.id, currency: code}});
                selectedPub({...pub, currency: code});
                client.writeQuery({
                  query: PUB_QUERY,
                  data: {pub: {...pub, currency: code}},
                });
              }}
              searchPlaceholder={'Search'}
              showCloseButton={true}
              showModalTitle={true}
            />
          ) : (
            <Text>{pub.currency}</Text>
          )}
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
            onPress={() => {
              updatePub({
                variables: {
                  id: pub.id,
                  address: values.address,
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                },
              });
              selectedPub({
                ...pub,
                address: values.address,
                latitude: marker.latitude,
                longitude: marker.longitude,
              });
              client.writeQuery({
                query: PUB_QUERY,
                data: {
                  pub: {
                    ...pub,
                    address: values.address,
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  },
                },
              });
            }}
          />
          <Text style={{fontWeight: 'bold', marginTop: 20}}>
            Reservation Time
          </Text>
          <TextInput
            style={{
              borderBottomColor: theme.red,
              borderBottomWidth: 2,
            }}
            editable={isAdmin}
            value={values?.reservationTime?.toString()}
            placeholder={'Must be a number'}
            placeholderTextColor={theme.darkGrey}
            onChange={({nativeEvent: {text}}) =>
              ((Number(text) && text.length < 3) || text.length < 1) &&
              onInputChange({key: 'reservationTime', value: text})
            }
          />
          <Text style={{fontWeight: 'bold', marginTop: 20}}>Name</Text>
          <TextInput
            style={{
              borderBottomColor: theme.red,
              borderBottomWidth: 2,
            }}
            value={values?.name?.toString()}
            editable={isAdmin}
            placeholder={'Must be a number'}
            placeholderTextColor={theme.darkGrey}
            onChange={({nativeEvent: {text}}) =>
              ((Number(text) && text.length < 3) || text.length < 1) &&
              onInputChange({key: 'reservationTime', value: text})
            }
          />
          <TouchableOpacity
            style={{
              backgroundColor: theme.red,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 8,
              marginBottom: 50,
              alignSelf: 'center',
              marginTop: 50,
            }}
            onPress={() => {
              Alert.alert(
                'Are you sure?',
                'If you delete this it you will need to insert it again.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: () => removePub(),
                    style: 'destructive',
                  },
                ],
                {
                  cancelable: false,
                },
              );
            }}>
            <Text style={{color: theme.white, fontWeight: 'bold'}}>DELETE</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </BottomSheetScrollView>
    </View>
  );
};
const styles = ({bottom}) =>
  StyleSheet.create({
    container: {
      padding: 20,
      flexGrow: 1,
      paddingBottom: bottom + 30,
    },
    empty: {
      width: Dimensions.get('window').width - 40,
      alignSelf: 'center',
    },
  });
export default PubAbout;
