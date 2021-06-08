import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {theme} from '../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {useReactiveVar} from '@apollo/client';
import {selectedPub} from '../../helpers/variables';

const PubAbout = () => {
  const {bottom} = useSafeAreaInsets();
  const {container, empty} = styles({
    bottom,
  });
  const pub = useReactiveVar(selectedPub);

  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <BottomSheetScrollView contentContainerStyle={container}>
        {/*<LottieView*/}
        {/*  source={require('../../assets/animations/empty-stores.json')}*/}
        {/*  loop={true}*/}
        {/*  autoPlay={true}*/}
        {/*  style={empty}*/}
        {/*/>*/}
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
