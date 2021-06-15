import Modal from 'react-native-modal';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMutation, useReactiveVar} from '@apollo/client';
import {selectedLocation, selectedPub} from '../../../helpers/variables';
import {Loader} from '../../Loader';
import {CREATE_TABLE} from '../../../graphql/mutations/Table';
import RNPickerSelect from 'react-native-picker-select';
import {client} from '../../../graphql';
import {PUB_QUERY} from '../../../graphql/queries/Pubs';

const AddTableModal = ({visible, onClose, locationId, position}) => {
  const {top} = useSafeAreaInsets();
  const pub = useReactiveVar(selectedPub);
  const [values, setValues] = useState({});
  const [create, {data, loading, error}] = useMutation(CREATE_TABLE);
  const location = useReactiveVar(selectedLocation);

  const onInputChange = ({key, value}) => {
    setValues({...values, [key]: value});
  };

  const addLocation = async () => {
    const response = await create({
      variables: {
        ...values,
        count: Number(values.count),
        position: Number(position),
        pubId: pub.id,
        locationId: locationId,
        waiterId: Number(values.waiterId),
      },
    });
    if (response?.data?.createTable) {
      const locations = pub.locations;
      const index = locations.findIndex((loc) => loc.id === location.id);
      if (index !== -1) {
        locations[index] = {
          ...locations[index],
          tables: locations[index]?.tables
            ? [...locations[index].tables, response?.data?.createTable]
            : [response?.data?.createTable],
        };
        selectedLocation(locations[index]);
      }
      client.writeQuery({
        query: PUB_QUERY,
        data: {
          pub: {
            ...pub,
            locations,
          },
        },
      });
      onClose();
    }
  };
  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      style={[style.modal, {paddingTop: top + 30}]}
      swipeDirection={'down'}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View style={style.content}>
        <View style={{marginTop: 20}}>
          <Loader loading={loading} />
          <Text style={{fontWeight: 'bold'}}>Waiter</Text>
          <View
            style={{
              borderBottomColor: theme.red,
              borderBottomWidth: 2,
              marginVertical: 15,
            }}>
            <RNPickerSelect
              onValueChange={(value) => onInputChange({key: 'waiterId', value})}
              items={pub?.waiters?.map((waiter) => ({
                value: waiter.id,
                label: waiter.email,
              }))}
            />
          </View>
          <Text style={{fontWeight: 'bold'}}>Count</Text>
          <TextInput
            style={{
              borderBottomColor: theme.red,
              borderBottomWidth: 2,
              marginVertical: 15,
            }}
            value={values?.count}
            placeholder={'Must be a number'}
            placeholderTextColor={theme.darkGrey}
            onChange={({nativeEvent: {text}}) =>
              ((Number(text) && text.length < 3) || text.length < 1) &&
              onInputChange({key: 'count', value: text})
            }
          />
          <Text style={{fontWeight: 'bold'}}>Table name</Text>
          <TextInput
            style={{
              borderBottomColor: theme.red,
              borderBottomWidth: 2,
              marginVertical: 15,
            }}
            value={values?.name}
            placeholder={'Table name'}
            placeholderTextColor={theme.darkGrey}
            onChange={({nativeEvent: {text}}) =>
              onInputChange({key: 'name', value: text})
            }
          />
          <Button title={'Add location'} onPress={addLocation} />
        </View>
      </View>
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

export default AddTableModal;
