import {Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../../helpers/constants';
import {selectedLocation} from '../../helpers/variables';
import React from 'react';

const WaiterHeader = ({locations, location}) => (
  <View
    style={{
      flexDirection: 'row',
      backgroundColor: theme.grey,
      padding: 3,
      marginBottom: 20,
      borderRadius: 6,
      alignSelf: 'center',
      marginRight: 10,
    }}>
    {locations?.map((loc, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => selectedLocation(loc)}
        style={{
          padding: 5,
          borderRadius: 5,
          paddingHorizontal: 20,
          backgroundColor: loc.id === location?.id ? theme.white : theme.grey,
        }}>
        <Text style={{color: theme.black}}>{loc.name}</Text>
      </TouchableOpacity>
    ))}
  </View>
);
export default WaiterHeader;
