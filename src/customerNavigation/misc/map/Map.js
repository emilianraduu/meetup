import React, {useCallback, useContext, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../../helpers/constants';
import MapView, {Marker} from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import PubCard from '../../main/PubCard';
import {useNavigation} from '@react-navigation/native';
import {pubs} from '../../../../dummyData';
import {PubsContext} from '../../../contexts/pubContext';
import {PubRoute} from '../../../helpers/routes';

const Map = () => {
  const navigation = useNavigation();
  const {onSelectPub} = useContext(PubsContext);
  const bottomSheetRef = useRef();

  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const onClose = () => {
    setIsVisible(false);
    setSelected(undefined);
  };
  const {top} = useSafeAreaInsets();

  const handleSheetChanges = useCallback((i) => {
    if (i === 0) {
      setSelected(undefined);
    }
  }, []);

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
          onPress={() => {
            bottomSheetRef?.current?.snapTo(0, () => {
              setSelected(undefined);
            });
          }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {pubs.map((pub, index) => (
            <Marker
              coordinate={{latitude: 37.78825, longitude: -122.4324}}
              onSelect={() => {
                onSelectPub(pub?.id);
                setSelected(pub);
              }}
            />
          ))}
        </MapView>
        {selected && (
          <BottomSheet
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            index={1}
            snapPoints={[-1, '20%']}
            animateOnMount={true}>
            <PubCard
              navigation={navigation}
              pub={selected}
              onSelectPub={() => {
                navigation.navigate(PubRoute);
                setIsVisible(false);
                setSelected(undefined);
              }}
            />
          </BottomSheet>
        )}
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
