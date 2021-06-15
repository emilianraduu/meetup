import {Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../../../helpers/constants';
import React from 'react';
import {useReactiveVar} from '@apollo/client';
import {selectedPub, user} from '../../../helpers/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DummyTable = ({index, size, addTable}) => {
  const pub = useReactiveVar(selectedPub);
  const usr = useReactiveVar(user);
  return Number(pub?.ownerId) === Number(usr.id) ? (
    <TouchableOpacity
      key={index}
      onPress={() => addTable(index)}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        width: size,
        height: size,
        borderRadius: 6,
        borderColor: theme.black,
        borderWidth: 1,
      }}>
      <View>
        <Ionicons name={'add-circle'} size={25} />
      </View>
    </TouchableOpacity>
  ) : (
    <View
      key={index}
      style={{
        width: size,
        margin: 3,
        borderRadius: 5,
        height: size,
        backgroundColor: theme.black,
        opacity: 0.02,
      }}
    />
  );
};
export default DummyTable;
