import React, {useState} from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {theme} from '../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useMutation, useReactiveVar} from '@apollo/client';
import {selectedPub, user} from '../../helpers/variables';
import {Loader} from '../Loader';
import {CREATE_WAITER} from '../../graphql/mutations/User';
import {client} from '../../graphql';
import {PUB_QUERY} from '../../graphql/queries/Pubs';

const PubWaiters = () => {
  const pub = useReactiveVar(selectedPub);
  const {bottom} = useSafeAreaInsets();
  const usr = useReactiveVar(user);

  const [create, {loading, error}] = useMutation(CREATE_WAITER);

  const [email, setEmail] = useState('');

  const {container} = styles({
    bottom,
  });

  const addWaiter = async () => {
    const response = await create({variables: {pubId: pub.id, email: email}});
    if (response?.data?.createWaiter) {
      client.writeQuery({
        query: PUB_QUERY,
        data: {
          pub: {
            ...pub,
            waiters: pub.waiters
              ? [...pub.waiters, response?.data?.createWaiter]
              : [response?.data?.createWaiter],
          },
        },
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <BottomSheetScrollView contentContainerStyle={container}>
        <Loader loading={loading} />
        {pub?.waiters?.length === 0 ? (
          <View>
            <Text>No waiters added. To use the app please add waiters</Text>
          </View>
        ) : (
          pub?.waiters?.map((waiter, index) => (
            <View key={index}>
              <Text>{waiter.email}</Text>
            </View>
          ))
        )}
        <TextInput
          autoCompleteType={'email'}
          textContentType={'emailAddress'}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          onChange={({nativeEvent: {text}}) => setEmail(text)}
        />
        <Button title={'Create watier'} onPress={addWaiter} />
      </BottomSheetScrollView>
    </View>
  );
};
const MenuItem = ({item, pub}) => {
  return (
    <View>
      <Text> {item.name}</Text>
      <Text> {item.description}</Text>
      <Text>
        {item.price} {pub.currency}
      </Text>
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
