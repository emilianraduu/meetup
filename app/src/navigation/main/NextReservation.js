import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import moment from 'moment';
import BottomSheet from '@gorhom/bottom-sheet';
import {theme} from '../../helpers/constants';
import CustomBackground from '../misc/filters/misc/CustomBackground';
import {getDistance} from 'geolib';
import {useReactiveVar} from '@apollo/client';
import {lat, long} from '../../helpers/variables';

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
    latitude &&
    longitude &&
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
        snapPoints={['10%', '70%']}>
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
            <Text style={{fontWeight: 'bold'}}>Location</Text>
            <Text style={{fontWeight: 'bold'}}>
              {nextReservation?.location?.name}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Address</Text>

            <Text style={{fontWeight: 'bold'}}>
              {nextReservation?.pub?.address}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Address</Text>

            <Text style={{fontWeight: 'bold'}}>{distance}</Text>
          </View>
        </View>
      </BottomSheet>
    )
  );
};
export default NextReservation;
