import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../../helpers/constants';
import MapView, {Marker} from 'react-native-maps';
import PubCard from '../../main/PubCard';
import {useNavigation} from '@react-navigation/native';
import {pubs} from '../../../../dummyData';
import {PubsContext} from '../../../contexts/pubContext';
import {PubRoute} from '../../../helpers/routes';

const Map = () => {
  const navigation = useNavigation();
  const {onSelectPub} = useContext(PubsContext);

  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const onClose = () => {
    setIsVisible(false);
    removeSelected();
  };
  const removeSelected = () => {
    setSelected(undefined);
  };
  const {top} = useSafeAreaInsets();

  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Icon
          name={'ios-map-outline'}
          size={24}
          color={theme.black}
          style={{marginRight: 10}}
        />
      </TouchableOpacity>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        style={styles.modal}
        animationIn={'slideInUp'}
        onBackButtonPress={onClose}>
        <TouchableOpacity
          onPress={onClose}
          style={{
            top: top + 20,
            position: 'absolute',
            left: 0,
            zIndex: 20,
            marginLeft: 20,
          }}>
          <Icon name={'arrow-back'} color={theme.white} size={30} />
        </TouchableOpacity>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {pubs.map((pub, index) => (
            <Marker
              coordinate={{latitude: 37.78825, longitude: -122.4324}}
              onPress={() => {
                setSelected(pub);
                onSelectPub(pub?.id);
              }}
            />
          ))}
        </MapView>
        <Modal
          isVisible={selected}
          style={{
            justifyContent: 'flex-end',
          }}
          animateOnMount={true}
          onBackdropPress={removeSelected}
          backdropOpacity={0.3}
          swipeDirection={'down'}
          onSwipeComplete={removeSelected}
          onBackButtonPress={removeSelected}>
          {selected && (
            <PubCard
              navigation={navigation}
              pub={selected}
              index={selected?.id}
              onSelectPub={() => {
                navigation.navigate(PubRoute);
                setIsVisible(false);
                setSelected(undefined);
              }}
            />
          )}
        </Modal>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    overflow: 'visible',
  },
});

export default Map;
