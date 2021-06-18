import Modal from 'react-native-modal';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme, user_status} from '../../../helpers/constants';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {selectedLocation, selectedPub, user} from '../../../helpers/variables';
import {useMutation, useReactiveVar} from '@apollo/client';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DELETE_TABLE, UPDATE_TABLE} from '../../../graphql/mutations/Table';
import {Loader} from '../../Loader';
import {client} from '../../../graphql';
import {PUB_QUERY} from '../../../graphql/queries/Pubs';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import storage from '@react-native-firebase/storage';
import {Image} from 'react-native-elements';
import {UPDATE_RESERVATION} from '../../../graphql/mutations/Reservation';

const AdminModal = ({onClose, isVisible, table, render, setRender}) => {
  const bottomSheetRef = useRef(null);
  const pub = useReactiveVar(selectedPub);
  const usr = useReactiveVar(user);
  const [update, {loading}] = useMutation(UPDATE_TABLE);
  const [removeTable, {loading: loadingRemove}] = useMutation(DELETE_TABLE);
  const location = useReactiveVar(selectedLocation);

  const snapPoints = useMemo(() => [-1, '65%', '100%'], []);
  const isAdmin =
    usr?.status === user_status.admin &&
    Number(pub?.ownerId) === Number(usr.id);
  const handleSheetChanges = useCallback((fromIndex, toIndex) => {
    if (fromIndex === 1 && toIndex === 0) {
      onClose();
    }
  }, []);
  const remove = async () => {
    const response = await removeTable({
      variables: {id: table.id},
    });
    if (response?.data?.deleteTable) {
      let newLocation = location;
      const index = newLocation?.tables?.findIndex((tb) => tb.id === table.id);
      newLocation.tables.splice(index, 1);
      selectedLocation(newLocation);
      const locs = pub.locations;
      const locIndex = pub.locations.findIndex((l) => l.id === location.id);
      locs[locIndex] = newLocation;
      client.writeQuery({
        query: PUB_QUERY,
        data: {pub: {...pub, locations: locs}},
      });
      setRender(!render);
      onClose();
    }
  };
  const updateTable = async ({key, value}) => {
    const response = await update({
      variables: {id: table.id, [key]: value},
    });
    if (response?.data?.updateTable) {
      let newLocation = location;
      const index = newLocation?.tables?.findIndex((tb) => tb.id === table.id);
      if (newLocation?.tables) {
        newLocation.tables[index] = response?.data?.updateTable;
        selectedLocation(newLocation);
        const locs = pub.locations;
        const locIndex = pub.locations.findIndex((l) => l.id === location.id);
        locs[locIndex] = newLocation;
        client.writeQuery({
          query: PUB_QUERY,
          data: {pub: {...pub, locations: locs}},
        });
        setRender(!render);
      }
    }
  };
  return (
    <Modal
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={'down'}
      propagateSwipe={true}
      style={{margin: 0, flex: 1}}
      isVisible={isVisible}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onAnimate={handleSheetChanges}>
        <SafeAreaView style={{flex: 1}}>
          <BottomSheetScrollView style={{flex: 1}}>
            <KeyboardAvoidingView
              behavior={'padding'}
              enabled
              contentContainerStyle={{flex: 1}}>
              <View style={{flex: 1, margin: 20, flexGrow: 1}}>
                <Text style={{fontWeight: 'bold'}}>Name</Text>
                <TextInput
                  onSubmitEditing={({nativeEvent: {text}}) =>
                    updateTable({key: 'name', value: text})
                  }
                  style={{fontSize: 22, fontWeight: 'bold'}}
                  defaultValue={table.name}
                />
                <Text style={{fontWeight: 'bold'}}>Count</Text>
                <TextInput
                  onSubmitEditing={({nativeEvent: {text}}) =>
                    updateTable({key: 'count', value: text})
                  }
                  keyboardType={'numeric'}
                  style={{fontSize: 22, fontWeight: 'bold'}}
                  defaultValue={table.count?.toString()}
                />
                {pub?.waiters?.length > 0 && (
                  <View style={{marginTop: 10}}>
                    <Text style={{fontWeight: 'bold'}}>Waiter</Text>
                    <RNPickerSelect
                      key={table.id}
                      onValueChange={(value) =>
                        updateTable({key: 'waiterId', value})
                      }
                      placeholder={
                        table?.waiter
                          ? {
                              value: table.waiterId,
                              label: table.waiter?.email,
                            }
                          : {value: 'Select a waiter', label: 'Select a waiter'}
                      }
                      items={pub?.waiters?.map((waiter) => ({
                        value: waiter.id,
                        label: waiter.email,
                      }))}
                    />
                  </View>
                )}
                <Text style={{fontWeight: 'bold', marginTop: 20}}>
                  Reservations
                </Text>
                {table.reservations.length === 0 && (
                  <Text style={{fontWeight: 'bold', marginTop: 10}}>
                    No reservations yet
                  </Text>
                )}
                {table.reservations
                  ?.sort?.((a, b) => a.date < b.date)
                  .map((res, index) => (
                    <Reservation key={index} reservation={res} />
                  ))}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  padding: 20,
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    updateTable({key: 'blocked', value: !table.blocked})
                  }
                  style={{
                    backgroundColor: theme.black,
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    marginBottom: 50,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: theme.white,
                      fontWeight: 'bold',
                      marginRight: 5,
                    }}>
                    {table.blocked ? 'Unblock table' : 'Block table'}
                  </Text>
                  <Ionicons
                    name={'ios-close-circle-outline'}
                    size={20}
                    color={theme.white}
                  />
                </TouchableOpacity>
                {isAdmin && (
                  <TouchableOpacity
                    onPress={remove}
                    style={{
                      backgroundColor: theme.red,
                      paddingVertical: 12,
                      paddingHorizontal: 20,
                      borderRadius: 8,
                      marginBottom: 50,
                      alignSelf: 'center',
                    }}>
                    <Text style={{color: theme.white, fontWeight: 'bold'}}>
                      Delete table
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </KeyboardAvoidingView>
            <Loader loading={loading || loadingRemove} />
          </BottomSheetScrollView>
        </SafeAreaView>
      </BottomSheet>
    </Modal>
  );
};

const Reservation = ({reservation}) => {
  const pub = useReactiveVar(selectedPub);
  const [update, {loading}] = useMutation(UPDATE_RESERVATION);
  const onPress = async ({key, value}) => {
    const response = await update({
      variables: {id: reservation.id, [key]: value},
    });
    if (response?.data?.updateReservation) {
    }
  };
  const now = moment(new Date());
  const start = moment(Number(reservation.date));
  const end = moment(Number(reservation.date)).add(
    pub?.reservationTime,
    'hours',
  );
  return (
    <View
      style={{
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.grey,
        backgroundColor: reservation.finished ? theme.grey : theme.white,
      }}>
      <Loader loading={loading} />
      <User item={reservation.user} />
      <Text style={{fontSize: 16, fontWeight: '700'}}>
        {start.format('HH:mm DD.MM.YYYY')} - {end.format('HH:mm DD.MM.YYYY')}
      </Text>
      {reservation.confirmed && !reservation.finished && now.isAfter(start) && (
        <TouchableOpacity
          onPress={() => onPress({key: 'finished', value: true})}
          style={{
            paddingHorizontal: 50,
            paddingVertical: 10,
            marginTop: 10,
            borderRadius: 20,
            backgroundColor: theme.dark,
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{fontWeight: 'bold', marginRight: 10, color: theme.white}}>
            End reservation
          </Text>
          <Ionicons name={'checkmark-sharp'} color={theme.white} />
        </TouchableOpacity>
      )}
      {reservation.finished && <Text>Finished</Text>}
      {!reservation.confirmed && (
        <TouchableOpacity
          onPress={() => onPress({key: 'confirmed', value: true})}
          style={{
            paddingHorizontal: 50,
            paddingVertical: 10,
            marginTop: 10,
            borderRadius: 20,
            backgroundColor: theme.dark,
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{fontWeight: 'bold', marginRight: 10, color: theme.white}}>
            Confirm reservation
          </Text>
          <Ionicons name={'checkmark-sharp'} color={theme.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const User = ({item}) => {
  const [image, setImage] = useState(undefined);
  useEffect(() => {
    if (item?.photo) {
      const getUrl = async () => {
        return await storage().ref(item?.photo).getDownloadURL();
      };
      getUrl().then((url) => {
        setImage(url);
      });
    }
  }, [item]);
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
      {image ? (
        <Image
          source={{uri: image}}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            marginRight: 5,
          }}
        />
      ) : (
        <Ionicons
          name={'person-circle'}
          size={50}
          color={theme.red}
          style={{marginRight: 5}}
        />
      )}
      <View>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item?.email}</Text>
      </View>
    </View>
  );
};

export default AdminModal;
