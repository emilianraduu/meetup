import React, {useContext} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DARK_COLOR, GREEN_COLOR, GREY_COLOR} from '../../helpers/constants';
import {PubsContext} from '../../contexts/pubContext';

export const TableScreen = () => {
  const {selectedPub: pub, onSelectLocation, selectedLocation} = useContext(
    PubsContext,
  );
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: GREY_COLOR,
          }}>
          {pub.locations.map((loc, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onSelectLocation(loc.id)}
              style={{
                padding: 5,
                backgroundColor:
                  loc.id === selectedLocation.id ? GREEN_COLOR : GREY_COLOR,
              }}>
              <Text>{loc.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {pub.locations.map((loc, index) => (
          <TableTab key={loc.id} location={loc} key={index} />
        ))}
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 15,
          backgroundColor: DARK_COLOR,
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
          alignSelf: 'center',
        }}>
        <Text style={{color: '#fff', fontSize: 16, zIndex: 200}}>
          Reserve table
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const TableTab = ({location}) => {
  const {selectedLocation} = useContext(PubsContext);
  return (
    location.id === selectedLocation.id && (
      <View
        style={{flex: 1, backgroundColor: '#fff'}}
        contentContainerStyle={{
          padding: 12,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {selectedLocation.tables.map((table) => (
          <View
            key={table.id}
            style={{
              borderRadius: 8,
              width: (Dimensions.get('window').width - 60) / 3,
              height: (Dimensions.get('window').width - 60) / 3,
              backgroundColor: GREY_COLOR,
              margin: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{table.capacity}</Text>
          </View>
        ))}
      </View>
    )
  );
};
