import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useReactiveVar} from '@apollo/client';
import {selectedLocation, selectedPub, user} from '../../../helpers/variables';
import {theme} from '../../../helpers/constants';
import Icon from 'react-native-vector-icons/Entypo';
import AddTableModal from './AddTableModal';
import ReservationModal from './ReservationModal';

const TableTab = ({locId, selected, setSelected}) => {
  const location = useReactiveVar(selectedLocation);
  const pub = useReactiveVar(selectedPub);
  const usr = useReactiveVar(user);
  const [modalTable, setModalTable] = useState(false);
  const [pos, setPos] = useState(undefined);
  useEffect(() => {
    location?.tables?.forEach((table) => {});
  }, [location, selected, setSelected]);

  const addTable = (position) => {
    setModalTable(true);
    setPos(position);
  };

  const size =
    (Dimensions.get('window').width - 40 - 9 * Number(location?.columns)) /
    location?.columns;
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
          }}>
          {[...Array.from(Array(location.rows + location.columns).keys())].map(
            (number, index) => {
              const table = location?.tables?.find(
                (tb) => tb.position === number,
              );
              if (table) {
                return (
                  <TouchableOpacity
                    key={index}
                    disabled={table?.blocked}
                    style={{
                      opacity: table?.blocked ? 0.5 : 1,
                      borderRadius: 20,
                      margin: 3,
                      backgroundColor: table
                        ? selected === table?.id
                          ? theme.black
                          : theme.grey
                        : 'transparent',
                      width: size,
                      height: size,
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
                return Number(pub.ownerId) === Number(usr.id) ? (
                  <TouchableOpacity
                    key={index}
                    onPress={() => addTable(index)}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 3,
                      width: size,
                      height: size,
                    }}>
                    <View>
                      <Text>Add table</Text>
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
              }
            },
          )}
        </View>
        <AddTableModal
          position={pos}
          visible={modalTable}
          onClose={() => setModalTable(false)}
          locationId={location?.id}
        />
      </View>
    )
  );
};
export default TableTab;
