import {PubsContext} from '../../../contexts/pubContext';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../../../helpers/constants';
import Icon from 'react-native-vector-icons/Entypo';
import React, {useContext} from 'react';

const TableTab = ({location, selected, setSelected}) => {
  const {selectedLocation} = useContext(PubsContext);
  return (
    location.id === selectedLocation.id && (
      <View
        style={{
          backgroundColor: '#fff',
          marginBottom: 20,
          flexGrow: 1,
        }}>
        {selectedLocation.tables.map((table) => (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {table.map((tb, i) => (
              <TouchableOpacity
                key={tb?.id}
                disabled={tb?.blocked}
                style={{
                  margin: 5,
                  opacity: tb?.blocked ? 0.5 : 1,
                  width:
                    (Dimensions.get('window').width - 80) /
                    Math.max(...selectedLocation.tables.map((el) => el.length)),
                  height:
                    (Dimensions.get('window').width - 80) /
                    Math.max(...selectedLocation.tables.map((el) => el.length)),
                  borderRadius: 20,
                  backgroundColor: tb
                    ? selected === tb?.id
                      ? theme.black
                      : theme.grey
                    : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setSelected(tb?.id)}>
                {tb?.blocked ? (
                  <Icon name={'block'} size={40} color={theme.red} />
                ) : (
                  tb && (
                    <>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: theme.white, fontWeight: 'bold'}}>
                          {tb?.capacity}
                        </Text>
                        <Icon name={'user'} color={theme.white} />
                      </View>
                    </>
                  )
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    )
  );
};
export default TableTab;
