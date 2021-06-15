import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../../helpers/constants';
import {useReactiveVar} from '@apollo/client';
import {selectedLocation, user} from '../../helpers/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Table from './table/Table';
import DummyTable from './table/DummyTable';
import TableTab from './table/TableTab';

const WaiterScreen = ({navigation, route}) => {
  const usr = useReactiveVar(user);
  const [locations, setLocations] = useState([]);
  const [missingLocation, setMissingLocation] = useState(undefined);
  const [selected, setSelected] = useState(undefined);
  const location = useReactiveVar(selectedLocation);
  const {tables} = usr;

  useEffect(() => {
    tables.map((table) => {
      if (table.location) {
        setMissingLocation(table.location);
      }
    });
  }, [usr]);

  useEffect(() => {
    if (!location && locations?.[0]) {
      selectedLocation(locations[0]);
    }
  }, [location, locations]);

  const {top} = useSafeAreaInsets();

  useEffect(() => {
    if (
      missingLocation &&
      !locations.find((loc) => loc.id === missingLocation.id)
    ) {
      setLocations([...locations, missingLocation]);
    }
  }, [locations, missingLocation]);
  const size =
    (Dimensions.get('window').width - 40 - 9 * Number(location?.columns)) /
    location?.columns;
  return (
    <View style={{flex: 1, backgroundColor: theme.white, paddingTop: top}}>
      <StatusBar barStyle={'dark-content'} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
        }}>
        <Text style={{fontSize: 34, fontWeight: 'bold'}}>{usr?.pub?.name}</Text>
        <TouchableOpacity>
          <Ionicons name={'notifications'} size={25} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          padding: 20,
        }}>
        <View style={{alignItems: 'flex-start', marginBottom: 20}}>
          {locations?.map((loc, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => selectedLocation(loc)}
              style={{
                padding: 5,
                borderRadius: 20,
                paddingHorizontal: 20,
                backgroundColor:
                  loc.id === location?.id ? theme.red : theme.darkGrey,
                marginRight: 10,
              }}>
              <Text style={{color: theme.white}}>{loc.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {location &&
            location.rows &&
            location.columns &&
            [...Array.from(Array(location.rows * location.columns).keys())].map(
              (number, index) => {
                const table = tables?.find((tb) => tb.position === number);

                if (table) {
                  return (
                    <Table
                      key={index}
                      size={size}
                      setSelected={setSelected}
                      selected={selected}
                      table={table}
                      index={index}
                      waiter={true}
                      // pub={pub}
                    />
                  );
                } else {
                  return (
                    <DummyTable
                      key={index}
                      size={size}
                      index={index}
                      // addTable={addTable}
                    />
                  );
                }
              },
            )}
        </View>
      </ScrollView>
    </View>
  );
};
export default WaiterScreen;
