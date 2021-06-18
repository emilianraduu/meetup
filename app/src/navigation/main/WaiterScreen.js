import {
  Dimensions,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../../helpers/constants';
import {useLazyQuery, useReactiveVar} from '@apollo/client';
import {selectedLocation, selectedPub, user} from '../../helpers/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GET_WAITER_TABLES} from '../../graphql/queries/Tables';
import WaiterHeader from './WaiterHeader';
import WaiterEmpty from './WaiterEmpty';
import WaiterTableList from './WaiterTableList';

const WaiterScreen = ({navigation, route}) => {
  const usr = useReactiveVar(user);
  const [locations, setLocations] = useState([]);
  const [tables, setTables] = useState(undefined);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const location = useReactiveVar(selectedLocation);
  const [fetch, {loading, data}] = useLazyQuery(GET_WAITER_TABLES);
  useEffect(() => {
    for (let i = 0; i < tables?.length; i++) {
      if (tables[i].location && !locations.includes(tables[i].location)) {
        setLocations([...locations, tables[i].location]);
      }
    }
  }, [tables, locations]);

  useEffect(() => {
    if (!location && locations?.[0]) {
      selectedLocation(locations[0]);
    }
  }, [location, locations]);

  const {top} = useSafeAreaInsets();

  // useEffect(() => {
  //   if (
  //     missingLocation &&
  //     !locations.find((loc) => loc.id === missingLocation.id)
  //   ) {
  //     setLocations([...locations, missingLocation]);
  //   }
  // }, [locations, missingLocation]);
  const size =
    (Dimensions.get('window').width - 40 - 9 * Number(location?.columns)) /
    location?.columns;

  useEffect(() => {
    fetch();
    selectedPub(usr.pub);
  }, []);

  useEffect(() => {
    if (data?.waiterTables) {
      setTables(data?.waiterTables);
    }
  }, [data]);

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
        <TouchableOpacity onPress={() => setShowNotifications(true)}>
          <Ionicons name={'notifications-outline'} size={25} />
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: 5,
              width: 5,
              backgroundColor: theme.red,
              borderRadius: 5,
            }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{flex: 1}}
        data={locations}
        ListHeaderComponent={
          <WaiterHeader locations={locations} location={location} />
        }
        ListEmptyComponent={<WaiterEmpty />}
        refreshing={loading}
        onRefresh={() => fetch()}
        renderItem={({item, index}) => (
          <WaiterTableList
            item={item}
            pub={usr.pub}
            key={index}
            location={location}
            size={size}
            setSelected={setSelected}
            selected={selected}
            tables={tables}
          />
        )}
        contentContainerStyle={{
          padding: 20,
        }}
      />
    </View>
  );
};
export default WaiterScreen;
