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
import {useMutation, useReactiveVar} from '@apollo/client';
import {
  date,
  selectedLocation,
  selectedPub,
  user,
} from '../../../helpers/variables';
import AddLocationModal from './AddLocationModal';
import {CREATE_RESERVATION} from '../../../graphql/mutations/Reservation';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {client} from '../../../graphql';
import {PUB_QUERY} from '../../../graphql/queries/Pubs';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const TableScreen = ({navigation}) => {
  const pub = useReactiveVar(selectedPub);
  const usr = useReactiveVar(user);
  const [selected, setSelected] = useState(undefined);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const location = useReactiveVar(selectedLocation);
  const [create] = useMutation(CREATE_RESERVATION);
  const currentDate = useReactiveVar(date);

  const {bottom} = useSafeAreaInsets();
  const hasReservation = usr?.reservations?.find((res) => !res.finished);

  const {container, spaceText, section, button, text, cta} = styles({
    bottom,
    selected,
    hasReservation,
  });
  const onInputChange = ({key, value}) => {
    date(value);
  };
  useEffect(() => {
    return () => {
      selectedLocation(undefined);
      setSelected(undefined);
    };
  }, []);
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
        date: moment(currentDate),
        tableId: selected.id,
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
      const newLocations = pub.locations;
      const indexLocation = newLocations.findIndex(
        (loc) => loc.id === location.id,
      );
      const tableIndex = newLocations[indexLocation].tables.findIndex(
        (table) => table.id === selected.id,
      );
      newLocations[indexLocation].tables[tableIndex].reservations = [
        ...newLocations[indexLocation].tables[tableIndex].reservations,
        response?.data.createReservation,
      ];
      client.writeQuery({
        query: PUB_QUERY,
        data: {
          pub: {
            ...pub,
            locations: newLocations,
          },
        },
      });
      navigation.goBack();
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <BottomSheetScrollView contentContainerStyle={container}>
        {Number(usr?.id) === Number(pub?.ownerId) ? (
          <Text style={spaceText}>
            Setup locations to match your place layout. {'\n\n'}This helps users
            visualize the layout and waiters to easily determine where tables
            are free.
          </Text>
        ) : (
          <Text style={spaceText}>Pick a space</Text>
        )}
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View style={section}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: theme.grey,
                padding: 3,
                borderRadius: 6,
                marginRight: 10,
              }}>
              {pub?.locations?.map((loc, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectedLocation(loc)}
                  style={[
                    button,
                    {
                      backgroundColor:
                        loc.id === location?.id ? theme.white : theme.grey,
                    },
                  ]}>
                  <Text style={text}>{loc.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {Number(usr?.id) === Number(pub?.ownerId) && (
              <TouchableOpacity
                onPress={openAddLocation}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons name={'add-circle'} size={20} />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        {Number(usr?.id) !== Number(pub?.ownerId) && (
          <View>
            <Text style={spaceText}>When you will arrive?</Text>
            <View style={section}>
              <RNDateTimePicker
                testID="dateTimePicker"
                value={new Date(currentDate)}
                minuteInterval={5}
                mode={'datetime'}
                minimumDate={new Date()}
                style={{flex: 1, alignSelf: 'flex-start'}}
                themeVariant={'light'}
                display="default"
                onChange={(e) => {
                  onInputChange({
                    key: 'date',
                    value: new Date(e.nativeEvent.timestamp),
                  });
                }}
              />
            </View>
          </View>
        )}
        {pub?.locations?.map((loc) => (
          <TableTab
            key={loc.id}
            locId={loc.id}
            selected={selected}
            setSelected={setSelected}
          />
        ))}

        {Number(usr?.id) !== Number(pub?.ownerId) && (
          <>
            {hasReservation && (
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 15,
                  color: theme.red,
                  fontWeight: 'bold',
                }}>
                You have a reservation ongoing please try again after it is
                finished
              </Text>
            )}
            <TouchableOpacity
              disabled={!selected || hasReservation}
              style={cta}
              onPress={completeReservation}>
              <Text style={{color: theme.white}}>Make reservation</Text>
            </TouchableOpacity>
          </>
        )}

        <AddLocationModal
          onClose={() => setShowLocationModal(false)}
          visible={showLocationModal}
        />
      </BottomSheetScrollView>
    </View>
  );
};
const styles = ({bottom, selected, hasReservation}) =>
  StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: bottom + 30,
    },
    spaceText: {
      fontSize: 13,
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
      borderRadius: 5,
      paddingHorizontal: 20,
    },
    text: {color: theme.black, fontSize: 12},
    cta: {
      backgroundColor: selected && !hasReservation ? theme.red : theme.black,
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
