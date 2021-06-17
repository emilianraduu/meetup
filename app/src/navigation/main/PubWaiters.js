import React, {useState} from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useMutation, useReactiveVar} from '@apollo/client';
import {selectedPub, user} from '../../helpers/variables';
import {Loader} from '../Loader';
import {CREATE_WAITER, DELETE_WAITER} from '../../graphql/mutations/User';
import {client} from '../../graphql';
import {PUB_QUERY} from '../../graphql/queries/Pubs';
import {validateEmail} from '../../helpers/validators';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PubWaiters = () => {
  const pub = useReactiveVar(selectedPub);
  const {bottom} = useSafeAreaInsets();
  const [deleteWaiter, {error: waiterError}] = useMutation(DELETE_WAITER);
  const [create, {loading}] = useMutation(CREATE_WAITER);

  const [email, setEmail] = useState('');
  const [errorString, setError] = useState('');
  const onInputChange = ({key, value}) => {
    if (errorString !== '') {
      setError('');
    }
    setEmail(value);
  };

  const {container} = styles({
    bottom,
  });

  const addWaiter = async () => {
    if (validateEmail(email)) {
      const response = await create({variables: {pubId: pub.id, email: email}});
      if (response?.data?.createWaiter && pub.waiters) {
        try {
          client.writeQuery({
            query: PUB_QUERY,
            data: {
              pub: {
                ...pub,
                waiters: [...pub.waiters, response?.data?.createWaiter],
              },
            },
          });
          pub.waiters = [...pub.waiters, response?.data?.createWaiter];
          setEmail('');
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      setError('Invalid email.');
    }
  };
  const onPressDelete = async ({id}) => {
    const response = await deleteWaiter({variables: {pubId: pub.id, id}});
    if (response?.data?.deleteWaiter) {
      let waiters = pub.waiters;
      const indexWaiter = waiters.findIndex(
        (waiter) => waiter.id === Number(id),
      );
      waiters.splice(indexWaiter, 1);
      client.writeQuery({query: PUB_QUERY, data: {pub: {...pub, waiters}}});
      setEmail(' ');
      setEmail('');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <BottomSheetScrollView contentContainerStyle={container}>
        <Loader loading={loading} />
        {pub?.waiters?.length === 0 ? (
          <View>
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
              No waiters added.{'\n'}To use the app please add waiters
            </Text>
          </View>
        ) : (
          pub?.waiters?.map((waiter, index) => (
            <View key={index}>
              <Text style={{fontWeight: 'bold'}}>Waiter</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: theme.red}}>
                  {waiter.email}
                </Text>
                <TouchableOpacity
                  onPress={() => onPressDelete({id: waiter.id})}>
                  <Ionicons name={'close'} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
        <TextInput
          autoCompleteType={'email'}
          textContentType={'emailAddress'}
          placeholder={'example@waiter.com'}
          value={email}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          placeholderTextColor={theme.darkGrey}
          style={{
            borderBottomWidth: 2,
            borderBottomColor: theme.red,
            marginVertical: 20,
          }}
          onChange={({nativeEvent: {text}}) => onInputChange({value: text})}
        />
        {!!errorString && <Text style={{color: theme.red}}>{errorString}</Text>}
        <TouchableOpacity onPress={addWaiter} style={{alignSelf: 'center'}}>
          <Text style={{fontWeight: 'bold', color: theme.red, fontSize: 16}}>
            Add waiter
          </Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </View>
  );
};
const styles = () =>
  StyleSheet.create({
    container: {
      padding: 20,
      flexGrow: 1,
      paddingBottom: 30,
    },
    empty: {
      width: Dimensions.get('window').width - 40,
      alignSelf: 'center',
    },
  });
export default PubWaiters;
