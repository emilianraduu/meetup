import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {theme, user_status} from '../../helpers/constants';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useMutation, useReactiveVar} from '@apollo/client';
import {selectedPub, user} from '../../helpers/variables';
import {Loader} from '../Loader';
import moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {
  CREATE_SCHEDULE,
  UPDATE_SCHEDULE,
} from '../../graphql/mutations/Schedule';

const PubSchedule = () => {
  const pub = useReactiveVar(selectedPub);
  const usr = useReactiveVar(user);
  const [selectedDay, setSelectedDay] = useState(moment.weekdays()[0]);
  const [create, {loading}] = useMutation(CREATE_SCHEDULE);
  const [update, {loading: loadingUpdate, error}] = useMutation(
    UPDATE_SCHEDULE,
  );
  const [values, setValues] = useState({
    timeStart: new Date(),
    timeEnd: new Date(),
  });
  const isAdmin =
    usr?.status === user_status.admin &&
    Number(pub?.ownerId) === Number(usr.id);
  const onInputChange = ({key, value}) => {
    setValues({...values, [key]: value});
  };
  const onPress = async () => {
    const schedules = pub.schedule;
    if (schedules.find((sc) => sc.dayOfWeek === selectedDay)) {
      const index = schedules.findIndex((sc) => sc.dayOfWeek === selectedDay);
      const response = await update({
        variables: {
          dayOfWeek: selectedDay,
          timeStart: moment(values.timeStart).format('HH:mm'),
          timeEnd: moment(values.timeStart).format('HH:mm'),
          pubId: pub.id,
          id: schedules[index]?.id,
        },
      });
      const newSchedules = pub.schedule;
      if (response?.data?.updateSchedule) {
        newSchedules[index] = response?.data?.updateSchedule;
        selectedPub({
          ...pub,
          schedule: newSchedules,
        });
      }
    } else {
      const response = await create({
        variables: {
          dayOfWeek: selectedDay,
          timeStart: moment(values.timeStart).format('HH:mm'),
          timeEnd: moment(values.timeStart).format('HH:mm'),
          pubId: pub.id,
        },
      });
      if (response?.data?.createSchedule) {
        selectedPub({
          ...pub,
          schedule: [...pub.schedule, response?.data?.createSchedule],
        });
      }
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <BottomSheetScrollView style={{paddingTop: 20, backgroundColor: 'black'}}>
        <Loader loading={false} />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {moment.weekdays().map((day, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedDay(day)}
              style={{
                backgroundColor: selectedDay === day ? theme.red : theme.dark,
                width: 50,
                height: 50,
                borderRadius: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: theme.white}}>{day.slice(0, 2)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{color: theme.white, marginLeft: 10}}>Time start</Text>
          <RNDateTimePicker
            disabled={!isAdmin}
            value={values.timeStart}
            minuteInterval={5}
            style={{flex: 1, justifyContent: 'flex-end'}}
            mode={'time'}
            onChange={(e) => {
              onInputChange({
                key: 'timeStart',
                value: new Date(e.nativeEvent.timestamp),
              });
            }}
          />
          <Text style={{color: theme.white, marginLeft: 10}}>Time end</Text>
          <RNDateTimePicker
            disabled={!isAdmin}
            value={values.timeEnd}
            minuteInterval={5}
            onChange={(e) => {
              onInputChange({
                key: 'timeEnd',
                value: new Date(e.nativeEvent.timestamp),
              });
            }}
            mode={'time'}
            style={{
              flex: 1,
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
            }}
          />
        </View>
        {isAdmin && (
          <TouchableOpacity
            onPress={onPress}
            style={{
              marginTop: 40,
              backgroundColor: theme.red,
              padding: 10,
              alignSelf: 'center',
              paddingHorizontal: 50,
              borderRadius: 8,
            }}>
            <Text style={{color: theme.white}}>Save schedule</Text>
          </TouchableOpacity>
        )}
        <Loader loading={loading || loadingUpdate} />
      </BottomSheetScrollView>
    </View>
  );
};

export default PubSchedule;
