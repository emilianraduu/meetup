import React from 'react';
import {Dimensions, StyleSheet, Switch, Text, View} from 'react-native';
import {theme} from '../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import MapView, {Marker} from 'react-native-maps';
import {useReactiveVar} from '@apollo/client';
import {selectedPub} from '../../helpers/variables';
import CurrencyPicker from 'react-native-currency-picker';

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

        <Text style={{fontWeight: 'bold'}}>Map location</Text>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', marginTop: 20}}>Visibility</Text>
          <Switch />
        </View>
        <Text style={{fontWeight: 'bold', marginTop: 20}}>Currency</Text>
        {console.log(pub.currency)}
        <CurrencyPicker
          enable={true}
          darkMode={false}
          currencyCode={pub.currency}
          showFlag={true}
          showCurrencyName={true}
          showCurrencyCode={true}
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
