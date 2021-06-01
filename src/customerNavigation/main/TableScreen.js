import React, {useContext, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DARK_COLOR,
  GREEN_COLOR,
  GREY_COLOR,
  theme,
} from '../../helpers/constants';
import {PubsContext} from '../../contexts/pubContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Entypo';

export const TableScreen = () => {
  const {selectedPub: pub, onSelectLocation, selectedLocation} = useContext(
    PubsContext,
  );

  const {bottom} = useSafeAreaInsets();

  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <BottomSheetScrollView
        contentContainerStyle={{
          padding: 20,
          flexGrow: 1,
          paddingBottom: bottom + 30,
        }}>
        {pub.locations?.length > 1 && (
          <>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: theme.black,
                marginBottom: 5,
              }}>
              Pick a space
            </Text>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: theme.white,
              }}>
              {pub.locations.map((loc, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => onSelectLocation(loc.id)}
                  style={{
                    padding: 5,
                    backgroundColor:
                      loc.id === selectedLocation.id ? theme.red : theme.grey,
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    marginRight: 10,
                  }}>
                  <Text style={{color: theme.white}}>{loc.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {pub.locations.map((loc) => (
          <TableTab key={loc.id} location={loc} />
        ))}

        <TouchableOpacity
          style={{
            backgroundColor: theme.black,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignSelf: 'center',
          }}>
          <Text style={{color: theme.white, fontSize: 16, zIndex: 200}}>
            Reserve table
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 12,
            margin: 12,
            fontWeight: '300',
            color: theme.grey,
          }}>
          or
        </Text>
        <TouchableOpacity
          style={{
            borderRadius: 8,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: theme.red,
              fontSize: 14,
              zIndex: 200,
              fontWeight: 'bold',
            }}>
            Request custom table
          </Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </View>
  );
};

const TableTab = ({location}) => {
  const {selectedLocation} = useContext(PubsContext);
  const createArrayFromCapacity = (capacity) => {
    return [...Array(capacity).keys()];
  };
  const getTablePosition = (index, capacity) => {
    if (capacity % 2 === 0) {
      switch (index) {
        case 0:
          return {
            top: 0,
            alignSelf: 'center',
          };
        case 1:
          return {right: 0, alignSelf: 'center'};
        case 2:
          return {bottom: 0, alignSelf: 'center'};
        case 3:
          return {left: 0, alignSelf: 'center'};
        case 4:
          return {alignSelf: 'flex-end'};
      }
    }
    return {};
  };
  const [selected, setSelected] = useState(undefined);
  return (
    location.id === selectedLocation.id && (
      <View
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginBottom: 20,
          flexGrow: 1,
        }}>
        {selectedLocation.tables.map((table) => (
          <TouchableOpacity
            key={table.id}
            disabled={table.blocked}
            style={{margin: 5, opacity: table.blocked ? 0.5 : 1, padding: 25}}
            onPress={() => setSelected(table.id)}>
            {createArrayFromCapacity(table.capacity).map((i) => (
              <View
                key={i}
                style={[
                  {
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    backgroundColor:
                      selected === table.id ? theme.black : theme.grey,
                    position: 'absolute',
                    zIndex: 2,
                  },
                  getTablePosition(i, table.capacity),
                ]}
              />
            ))}
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                backgroundColor:
                  selected === table.id ? theme.black : theme.grey,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {table.blocked ? (
                <Icon name={'block'} size={40} color={theme.red} />
              ) : (
                <>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: theme.white, fontWeight: 'bold'}}>
                      {table.capacity}
                    </Text>
                    <Icon name={'user'} color={theme.white} />
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    )
  );
};
