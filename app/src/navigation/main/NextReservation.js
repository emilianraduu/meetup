import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import moment from 'moment';
import BottomSheet from '@gorhom/bottom-sheet';
import {theme} from '../../helpers/constants';
import CustomBackground from '../misc/filters/misc/CustomBackground';
import {getDistance} from 'geolib';
import {useReactiveVar} from '@apollo/client';
import {lat, long} from '../../helpers/variables';
import MapView, {Marker} from 'react-native-maps';

const NextReservation = ({nextReservation}) => {
  const [index, setIndex] = useState(0);
  const bottomSheetRef = useRef();
  const latitude = useReactiveVar(lat);
  const longitude = useReactiveVar(long);
  const [dueDate, setDueDate] = useState(undefined);

  const handleSheetChanges = useCallback((i) => {
    setIndex(i);
  }, []);
  useEffect(() => {
    setDueDate(
      nextReservation &&
        moment.duration(moment(Number(nextReservation.date)).diff(new Date())),
    );
    setInterval(() => {
      setDueDate(
        nextReservation &&
          moment.duration(
            moment(Number(nextReservation.date)).diff(new Date()),
          ),
      );
    }, 60000);
  }, []);

  const distance =
    nextReservation &&
    nextReservation?.pub &&
    latitude &&
    longitude &&
    nextReservation?.pub?.latitude &&
    nextReservation?.pub?.latitude &&
    getDistance(
      {latitude, longitude},
      {
        latitude: nextReservation?.pub?.latitude,
        longitude: nextReservation?.pub?.longitude,
      },
    );
  return (
    nextReservation && (
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        backgroundComponent={({...props}) => (
          <CustomBackground index={index} {...props} border={true} />
        )}
        onChange={handleSheetChanges}
        snapPoints={['7%', '70%']}>
        <View
          style={{
            padding: 10,
            backgroundColor: theme.white,
          }}>
          <View style={{backgroundColor: theme.white}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 20}}>
              {dueDate > 0
                ? `Your next reservation is in ${dueDate.humanize()}`
                : 'Your reservation is ongoing'}
            </Text>
            <Text>Location</Text>
            <Text style={{fontWeight: 'bold'}}>
              {nextReservation?.location?.name}
            </Text>
            <Text style={{marginTop: 20}}>Address</Text>
            <Text style={{fontWeight: 'bold', color: theme.red}}>
              {nextReservation?.pub?.address}
            </Text>
            <Text style={{marginTop: 20}}>Distance</Text>
            <Text style={{fontWeight: 'bold'}}>{distance}m</Text>
            <Text style={{marginTop: 20}}>Name</Text>
            <Text style={{fontWeight: 'bold'}}>
              {nextReservation?.pub.name}
            </Text>
            {nextReservation?.pub.latitude && nextReservation?.pub.longitude && (
              <MapView
                scrollEnabled={false}
                pitchEnabled={false}
                style={{
                  height: 200,
                  borderRadius: 20,
                  overflow: 'hidden',
                  marginTop: 10,
                }}
                initialRegion={{
                  latitude: nextReservation?.pub?.latitude,
                  longitude: nextReservation?.pub?.longitude,
                  latitudeDelta: 0.122,
                  longitudeDelta: 0.1421,
                }}>
                <Marker
                  coordinate={{
                    latitude: nextReservation?.pub.latitude,
                    longitude: nextReservation?.pub.longitude,
                  }}
                />
              </MapView>
            )}
          </View>
        </View>
      </BottomSheet>
    )
  );
};
export default NextReservation;
