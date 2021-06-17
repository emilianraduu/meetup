import Modal from 'react-native-modal';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme, user_status} from '../../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMutation, useReactiveVar} from '@apollo/client';
import {
  CREATE_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION,
} from '../../../graphql/mutations/Location';
import {selectedLocation, selectedPub, user} from '../../../helpers/variables';
import {client} from '../../../graphql';
import {PUB_QUERY} from '../../../graphql/queries/Pubs';
import {Loader} from '../../Loader';

const AddLocationModal = ({visible, onClose, edit}) => {
  const {top} = useSafeAreaInsets();
  const location = useReactiveVar(selectedLocation);
  const pub = useReactiveVar(selectedPub);
  const usr = useReactiveVar(user);
  const [values, setValues] = useState({
    rows: location?.rows,
    columns: location?.columns,
    name: location?.name,
  });
  const [create, {loading}] = useMutation(CREATE_LOCATION);
  const [update, {loading: loadingUpdate}] = useMutation(UPDATE_LOCATION);
  const [deleteLocation, {loading: loadingDelete}] = useMutation(
    DELETE_LOCATION,
  );
  const onInputChange = ({key, value}) => {
    setValues({...values, [key]: value});
  };
  const removeLocationAction = async () => {
    try {
      const response = await deleteLocation({variables: {id: location.id}});
      if (response.data) {
        const newLocations = pub.locations;
        const index = newLocations.findIndex((loc) => loc.id === location.id);
        newLocations.splice(index, 1);
        client.writeQuery({
          query: PUB_QUERY,
          data: {pub: {...pub, locations: newLocations}},
        });
      }
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };
  const addLocation = async () => {
    const response = await create({
      variables: {
        ...values,
        columns: Number(values.columns),
        rows: Number(values.rows),
        pubId: pub.id,
      },
    });
    if (response?.data?.createLocation) {
      selectedLocation(response?.data?.createLocation);
      client.writeQuery({
        query: PUB_QUERY,
        data: {
          pub: {
            ...pub,
            locations: [...pub.locations, response?.data?.createLocation],
          },
        },
      });
      onClose();
    }
  };
  const removeLocation = () => {
    Alert.alert(
      'Are you sure?',
      'If you delete this it you will need to insert it again.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: removeLocationAction,
          style: 'destructive',
        },
      ],
      {
        cancelable: false,
      },
    );
  };
  const updateLocation = async () => {
    const response = await update({
      variables: {
        ...values,
        columns: Number(values.columns),
        rows: Number(values.rows),
        pubId: pub.id,
        id: location.id,
      },
    });
    if (response?.data?.updateLocation) {
      let newLocations = pub.locations;
      const index = newLocations.findIndex((loc) => loc.id === location.id);
      newLocations[index] = response?.data?.updateLocation;
      selectedLocation(response?.data?.updateLocation);
      client.writeQuery({
        query: PUB_QUERY,
        data: {
          pub: {
            ...pub,
            locations: newLocations,
          },
        },
      });
      onClose();
    }
  };
  const isAdmin =
    usr?.status === user_status.admin &&
    Number(pub?.ownerId) === Number(usr.id);
  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      style={[style.modal, {paddingTop: top + 30}]}
      swipeDirection={'down'}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <KeyboardAvoidingView behavior={'padding'} enabled style={style.content}>
        <View style={{marginTop: 20}}>
          <Loader loading={loading || loadingUpdate || loadingDelete} />
          <Text style={{fontWeight: 'bold'}}>Location name</Text>
          <TextInput
            style={{
              borderBottomColor: theme.red,
              borderBottomWidth: 2,
              marginVertical: 15,
            }}
            value={values?.name}
            placeholder={'Location name can be outside/inside'}
            placeholderTextColor={theme.darkGrey}
            onChange={({nativeEvent: {text}}) =>
              onInputChange({key: 'name', value: text})
            }
          />
          <Text style={{fontWeight: 'bold'}}>Rows</Text>
          <TextInput
            style={{
              borderBottomColor: theme.red,
              borderBottomWidth: 2,
              marginVertical: 15,
            }}
            value={values?.rows?.toString()}
            placeholder={'Must be a number'}
            placeholderTextColor={theme.darkGrey}
            onChange={({nativeEvent: {text}}) =>
              ((Number(text) && text.length < 2) || text.length < 1) &&
              onInputChange({key: 'rows', value: text})
            }
          />

          <Text style={{fontWeight: 'bold'}}>Columns</Text>
          <TextInput
            style={{
              borderBottomColor: theme.red,
              borderBottomWidth: 2,
              marginVertical: 15,
            }}
            value={values?.columns?.toString()}
            placeholder={'Must be a number'}
            placeholderTextColor={theme.darkGrey}
            onChange={({nativeEvent: {text}}) =>
              ((Number(text) && text.length < 2) || text.length < 1) &&
              onInputChange({key: 'columns', value: text})
            }
          />
          <TouchableOpacity
            onPress={edit ? updateLocation : addLocation}
            style={{
              alignSelf: 'center',
              backgroundColor: theme.red,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 8,
              marginBottom: 20,
            }}>
            <Text style={{fontWeight: 'bold', color: theme.white}}>
              {edit ? 'Update location' : 'Add location'}
            </Text>
          </TouchableOpacity>
          {edit && isAdmin && (
            <TouchableOpacity
              onPress={removeLocation}
              style={{
                alignSelf: 'center',
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 8,
                marginBottom: 20,
              }}>
              <Text style={{fontWeight: 'bold', color: theme.red}}>
                Delete location
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const style = StyleSheet.create({
  content: {
    backgroundColor: theme.white,
    borderRadius: 20,
    padding: 20,
    flex: 0.5,
  },
  modal: {justifyContent: 'flex-end', margin: 0},
});

export default AddLocationModal;
