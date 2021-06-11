import Modal from 'react-native-modal';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMutation, useReactiveVar} from '@apollo/client';
import {CREATE_LOCATION} from '../../../graphql/mutations/Location';
import {selectedLocation, selectedPub} from '../../../helpers/variables';
import {client} from '../../../graphql';
import {PUB_QUERY} from '../../../graphql/queries/Pubs';
import {Loader} from '../../Loader';

const AddLocationModal = ({visible, onClose}) => {
  const {top} = useSafeAreaInsets();
  const pub = useReactiveVar(selectedPub);
  const [values, setValues] = useState({});
  const [create, {data, loading, error}] = useMutation(CREATE_LOCATION);
  const onInputChange = ({key, value}) => {
    setValues({...values, [key]: value});
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
          <Text>Location name</Text>
          <TextInput
            onChange={({nativeEvent: {text}}) =>
              onInputChange({key: 'name', value: text})
            }
          />
          <Text>Rows</Text>
          <TextInput
            onChange={({nativeEvent: {text}}) =>
              onInputChange({key: 'rows', value: text})
            }
          />

          <Text>Columns</Text>
          <TextInput
            onChange={({nativeEvent: {text}}) =>
              onInputChange({key: 'columns', value: text})
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
    flex: 1,
  },
  modal: {justifyContent: 'flex-end', margin: 0},
});

export default AddLocationModal;
