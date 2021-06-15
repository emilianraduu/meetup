import Modal from 'react-native-modal';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
  const [values, setValues] = useState({rows: 1, columns: 1, name: ''});
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
          <Text style={{fontWeight: 'bold'}}>Location name</Text>
          <TextInput
            style={{
              borderBottomColor: theme.red,
              borderBottomWidth: 2,
              marginVertical: 15,
            }}
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
            value={values?.rows}
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
            value={values?.columns}
            placeholder={'Must be a number'}
            placeholderTextColor={theme.darkGrey}
            onChange={({nativeEvent: {text}}) =>
              ((Number(text) && text.length < 2) || text.length < 1) &&
              onInputChange({key: 'columns', value: text})
            }
          />
          <TouchableOpacity
            onPress={addLocation}
            style={{
              alignSelf: 'center',
              backgroundColor: theme.red,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 8,
              marginBottom: 50,
            }}>
            <Text style={{fontWeight: 'bold', color: theme.white}}>
              Add location
            </Text>
          </TouchableOpacity>
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

export default AddLocationModal;
