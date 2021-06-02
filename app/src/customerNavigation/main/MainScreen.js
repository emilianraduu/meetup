import React, {useContext, useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import randomLocation from 'random-location';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {pubs} from '../../../dummyData';
import {theme} from '../../helpers/constants';
import {PubsContext} from '../../contexts/pubContext';
import Filters from '../misc/filters/Filters';
import PubCard from './PubCard';
import Map from '../misc/map/Map';
import LottieView from 'lottie-react-native';
import {useLazyQuery} from '@apollo/client';

export const MainScreen = ({navigation}) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const {top} = useSafeAreaInsets();
  const {onSelectPub} = useContext(PubsContext);

  // useEffect(() => {
  //   Geolocation.watchPosition(
  //     ({coords: {latitude, longitude}}) => {
  //       setLat(latitude);
  //       setLng(longitude);
  //     },
  //     (e) => console.log(e),
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 5000,
  //       maximumAge: 500,
  //       distanceFilter: 10,
  //     },
  //   );
  // });
  // useEffect(() => {
  //   Geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
  //     setLat(latitude);
  //     setLng(longitude);
  //   });
  // }, []);
  // const [locations, setLocations] = useState([]);
  // useEffect(() => {
  //   if (lat && lng) {
  //     if (locations.length < 5) {
  //       const obj = randomLocation.randomCirclePoint(
  //         {latitude: lat, longitude: lng},
  //         300,
  //       );
  //
  //       if (!locations.includes(obj)) {
  //         setLocations([...locations, obj]);
  //       }
  //     }
  //   }
  // }, [lat, lng, locations]);
  return (
    <View style={{flex: 1, paddingTop: top, backgroundColor: theme.white}}>
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 34, fontWeight: 'bold'}}>Explore</Text>
          <View style={{flexDirection: 'row'}}>
            <Map />
            <Filters />
          </View>
        </View>
        {pubs?.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <LottieView
              source={require('../../assets/animations/empty-stores.json')}
              loop={true}
              autoPlay={true}
              style={{
                width: Dimensions.get('window').width - 40,
                alignSelf: 'center',
              }}
            />
            <View style={{alignItems: 'center'}}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
                Seems like there isn't anything near you yet!
              </Text>
            </View>
          </View>
        ) : (
          pubs.map((pub, index) => (
            <PubCard
              key={index}
              navigation={navigation}
              index={index}
              pub={pub}
              onSelectPub={onSelectPub}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};
