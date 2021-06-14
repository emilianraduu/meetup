import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {theme} from '../../helpers/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, {Marker} from 'react-native-maps';
import Modal from 'react-native-modal';
import React from 'react';

const LocationModal = ({
  showModal,
  setShowModal,
  top,
  bottom,
  values,
  latitude,
  longitude,
  setMarker,
  marker,
  onChangeInput,
}) => {
  const onMapPress = ({
    nativeEvent: {
      coordinate: {latitude: pressedLatitude, longitude: pressedLongitude},
    },
  }) => {
    setMarker({
      latitude: pressedLatitude,
      longitude: pressedLongitude,
    });
  };
  const onClose = () => setShowModal(false);
  const {mapView, rightButton, wrapper, modal, back, input, check} = style({
    top,
    bottom,
  });
  const initialRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.122,
    longitudeDelta: 0.1421,
  };
  return (
    <Modal isVisible={showModal} style={modal} onBackdropPress={onClose}>
      <View style={wrapper}>
        <TouchableOpacity onPress={onClose}>
          <Icon
            name={'arrow-back'}
            size={25}
            style={back}
            color={theme.black}
          />
        </TouchableOpacity>
        <TextInput
          onChange={({nativeEvent: {text}}) =>
            onChangeInput({key: 'address', value: text})
          }
          value={values?.address}
          placeholder={'Press on map or insert address'}
          placeholderTextColor={theme.grey}
          style={input}
        />
      </View>
      {!!values.address && (
        <View style={check}>
          <TouchableOpacity
            onPress={() => {
              if (marker) {
                setShowModal(false);
              } else {
                alert('Please select location on the map');
              }
            }}
            style={rightButton}>
            <Icon name={'check'} size={25} color={theme.black} />
          </TouchableOpacity>
        </View>
      )}
      {latitude && longitude && (
        <MapView
          style={mapView}
          onPress={onMapPress}
          initialRegion={initialRegion}>
          {marker && <Marker coordinate={marker} />}
        </MapView>
      )}
    </Modal>
  );
};

const style = ({top, bottom}) =>
  StyleSheet.create({
    mapView: {height: '100%'},
    rightButton: {
      backgroundColor: theme.white,
      padding: 10,
      borderRadius: 50,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 5.0,
      elevation: 1,
    },
    wrapper: {
      top: top + 20,
      left: 20,
      right: 20,
      zIndex: 1000,
      position: 'absolute',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 5.0,
      elevation: 1,
      marginVertical: 20,
      backgroundColor: theme.white,
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
    },
    modal: {flex: 1, margin: 0},
    back: {zIndex: 100, marginRight: 20},
    input: {
      zIndex: 1000,
      color: theme.black,
      flex: 1,
      flexWrap: 'wrap',
    },
    check: {
      flex: 1,
      position: 'absolute',
      right: 20,
      bottom: bottom + 20,
      zIndex: 100,
    },
  });

export default LocationModal;
