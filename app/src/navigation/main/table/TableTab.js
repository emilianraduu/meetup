import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useReactiveVar} from '@apollo/client';
import {selectedLocation} from '../../../helpers/variables';
import {theme} from '../../../helpers/constants';
import Icon from 'react-native-vector-icons/Entypo';

const TableTab = ({locId, selected, setSelected}) => {
  const location = useReactiveVar(selectedLocation);
  useEffect(() => {
    location?.tables?.forEach((table) => {});
  }, [location, selected, setSelected]);

  return (
    locId === location?.id && (
      <View
        style={{
          backgroundColor: '#fff',
          marginBottom: 20,
          flexGrow: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {[...Array.from(Array(location.rows + location.columns).keys())].map(
            (number, index) => {
              const table = location.tables.find(
                (tb) => tb.position === number,
              );
              if (table) {
                return (
                  <TouchableOpacity
                    key={index}
                    disabled={table?.blocked}
                    style={{
                      margin: 5,
                      opacity: table?.blocked ? 0.5 : 1,
                      borderRadius: 20,
                      backgroundColor: table
                        ? selected === table?.id
                          ? theme.black
                          : theme.grey
                        : 'transparent',
                      width:
                        (Dimensions.get('window').width - 100) /
                        location.columns,
                      height:
                        (Dimensions.get('window').width - 100) /
                        location.columns,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => setSelected(table?.id)}>
                    {table?.blocked ? (
                      <Icon name={'block'} size={40} color={theme.red} />
                    ) : (
                      table && (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: theme.white,
                                fontWeight: 'bold',
                              }}>
                              {table?.count}
                            </Text>
                            <Icon name={'user'} color={theme.white} />
                          </View>
                        </>
                      )
                    )}
                  </TouchableOpacity>
                );
              } else {
                return (
                  <View
                    key={index}
                    style={{
                      width:
                        (Dimensions.get('window').width - 100) /
                        location.columns,
                      height:
                        (Dimensions.get('window').width - 100) /
                        location.columns,
                    }}
                  />
                );
              }
            },
          )}
        </View>
      </View>
    )
  );
};
export default TableTab;
