import React, {useContext, useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {ScrollView, Text, View} from 'react-native';
import randomLocation from 'random-location';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {pubs} from '../../../dummyData';
import {theme} from '../../helpers/constants';
import {PubsContext} from '../../contexts/pubContext';
import Filters from '../misc/filters/Filters';
import PubCard from './PubCard';
import Map from '../misc/map/Map';

export const MainScreen = ({navigation}) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const {top} = useSafeAreaInsets();
  const {onSelectPub} = useContext(PubsContext);

  useEffect(() => {
    Geolocation.watchPosition(
      ({coords: {latitude, longitude}}) => {
        setLat(latitude);
        setLng(longitude);
      },
      (e) => console.log(e),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 500,
        distanceFilter: 10,
      },
    );
  });
  useEffect(() => {
    Geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setLat(latitude);
      setLng(longitude);
    });
  }, []);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    if (lat && lng) {
      if (locations.length < 5) {
        const obj = randomLocation.randomCirclePoint(
          {latitude: lat, longitude: lng},
          300,
        );

        if (!locations.includes(obj)) {
          setLocations([...locations, obj]);
        }
      }
    }
  }, [lat, lng, locations]);
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
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 34, fontWeight: 'bold'}}>Explore</Text>
          <View style={{flexDirection: 'row'}}>
            <Map />
            <Filters />
          </View>
        </View>
        {pubs.map((pub, index) => (
          <PubCard
            key={index}
            navigation={navigation}
            index={index}
            pub={pub}
            onSelectPub={onSelectPub}
          />
        ))}
      </ScrollView>
    </View>
  );
};
