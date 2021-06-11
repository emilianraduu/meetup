import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import TableTab from './TableTab';
import ReservationModal from './ReservationModal';
import {useMutation, useReactiveVar} from '@apollo/client';
import {selectedLocation, selectedPub, user} from '../../../helpers/variables';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import AddLocationModal from './AddLocationModal';
import {CREATE_RESERVATION} from '../../../graphql/mutations/Reservation';

export const TableScreen = ({navigation}) => {
  const pub = useReactiveVar(selectedPub);
  const usr = useReactiveVar(user);
  const [selected, setSelected] = useState(undefined);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const location = useReactiveVar(selectedLocation);
  const [values, setValues] = useState({});
  const [create, {data, error, loading}] = useMutation(CREATE_RESERVATION);

  const {bottom} = useSafeAreaInsets();
  const {
    container,
    spaceText,
    section,
    button,
    text,
    cta,
    smallText,
    customBtn,
  } = styles({
    bottom,
    selected,
  });
  const onInputChange = ({key, value}) => {
    setValues({...values, [key]: value});
  };
  useEffect(() => {
    if (!location && pub?.locations?.[0]) {
      selectedLocation(pub.locations[0]);
    }
  }, [location, pub]);
  const openAddLocation = () => {
    setShowLocationModal(true);
  };

  const completeReservation = async () => {
    const response = await create({
      variables: {
        pubId: pub.id,
        locationId: location.id,
        date: values.date,
        startHour: dayjs(values.startHour).format('HH:mm'),
        tableId: selected,
      },
    });
    if (response?.data.createReservation) {
      setSelected(undefined);
      user({
        ...usr,
        reservations: user.reservations
          ? [...user.reservations, response?.data.createReservation]
          : [response?.data.createReservation],
      });
      setShowReservationModal(false);
      navigation.goBack();
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <BottomSheetScrollView contentContainerStyle={container}>
        <>
          <Text style={spaceText}>Pick a space</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <View style={section}>
              {pub?.locations?.map((loc, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectedLocation(loc)}
                  style={[
                    button,
                    {
                      backgroundColor:
                        loc.id === location?.id ? theme.red : theme.grey,
                    },
                  ]}>
                  <Text style={text}>{loc.name}</Text>
                </TouchableOpacity>
              ))}
              {Number(usr?.id) === Number(pub?.ownerId) && (
                <TouchableOpacity
                  onPress={openAddLocation}
                  style={[button, {borderWidth: 1, borderColor: theme.red}]}>
                  <Text style={[text, {color: theme.red}]}>Add location</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </>
        {pub?.locations?.map((loc) => (
          <TableTab
            key={loc.id}
            locId={loc.id}
            selected={selected}
            setSelected={setSelected}
          />
        ))}

        {Number(usr?.id) !== Number(pub?.ownerId) && (
          <TouchableOpacity
            disabled={!selected}
            style={cta}
            onPress={() => {
              setShowReservationModal(true);
            }}>
            <Text style={text}>Reserve table</Text>
          </TouchableOpacity>
        )}
        <ReservationModal
          visible={showReservationModal}
          onClose={() => setShowReservationModal(false)}>
          {selected && (
            <View>
              <Text style={spaceText}>Pick a date</Text>
              <View style={section}>
                <RNDateTimePicker
                  testID="dateTimePicker"
                  value={values.date ? new Date(values.date) : new Date()}
                  minuteInterval={5}
                  mode={'date'}
                  themeVariant={'light'}
                  minimumDate={new Date()}
                  style={{flex: 1, alignSelf: 'flex-start'}}
                  display="default"
                  onChange={(e) =>
                    onInputChange({
                      key: 'date',
                      value: dayjs(e.nativeEvent.timestamp),
                    })
                  }
                />
              </View>
              <Text style={spaceText}>When you will arrive?</Text>
              <View style={section}>
                <RNDateTimePicker
                  testID="dateTimePicker"
                  value={
                    values.startHour ? new Date(values.startHour) : new Date()
                  }
                  minuteInterval={5}
                  mode={'time'}
                  style={{flex: 1, alignSelf: 'flex-start'}}
                  themeVariant={'light'}
                  display="default"
                  onChange={(e) =>
                    onInputChange({
                      key: 'startHour',
                      value: e.nativeEvent.timestamp,
                    })
                  }
                />
              </View>
              {/*<View style={section}>*/}
              {/*  <RNDateTimePicker*/}
              {/*    testID="dateTimePicker"*/}
              {/*    value={values.endTime ? new Date(values.endTime) : new Date()}*/}
              {/*    themeVariant={'light'}*/}
              {/*    minuteInterval={5}*/}
              {/*    style={{flex: 1, alignItems: 'flex-end'}}*/}
              {/*    mode={'time'}*/}
              {/*    display="default"*/}
              {/*    onChange={(e) =>*/}
              {/*      onInputChange({*/}
              {/*        key: 'endTime',*/}
              {/*        value: dayjs(e.nativeEvent.timestamp),*/}
              {/*      })*/}
              {/*    }*/}
              {/*  />*/}
              {/*</View>*/}
              <TouchableOpacity style={cta} onPress={completeReservation}>
                <Text style={text}>Complete reservation</Text>
              </TouchableOpacity>
            </View>
          )}
        </ReservationModal>
        <AddLocationModal
          onClose={() => setShowLocationModal(false)}
          visible={showLocationModal}
        />
      </BottomSheetScrollView>
    </View>
  );
};
const styles = ({bottom, selected}) =>
  StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: bottom + 30,
    },
    spaceText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: theme.black,
      marginBottom: 5,
    },
    section: {
      flexDirection: 'row',
      backgroundColor: theme.white,
      marginBottom: 20,
    },
    button: {
      padding: 5,
      borderRadius: 20,
      paddingHorizontal: 20,
      marginRight: 10,
    },
    text: {color: theme.white},
    cta: {
      backgroundColor: selected ? theme.red : theme.black,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginBottom: 50,
      alignSelf: 'center',
    },
    smallText: {
      alignSelf: 'center',
      fontSize: 12,
      margin: 12,
      fontWeight: '300',
      color: theme.grey,
    },
    customBtn: {
      color: theme.red,
      fontSize: 14,
      zIndex: 200,
      alignSelf: 'center',
      fontWeight: 'bold',
    },
  });
