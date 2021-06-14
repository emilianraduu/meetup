import {Dimensions, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useReactiveVar} from '@apollo/client';
import {
  date,
  selectedLocation,
  selectedPub,
  user,
} from '../../../helpers/variables';
import AddTableModal from './AddTableModal';
import Table from './Table';
import DummyTable from './DummyTable';
import {theme} from '../../../helpers/constants';

const TableTab = ({locId, selected, setSelected, values}) => {
  const location = useReactiveVar(selectedLocation);
  const pub = useReactiveVar(selectedPub);
  const [modalTable, setModalTable] = useState(false);
  const [pos, setPos] = useState(undefined);

  const addTable = (position) => {
    setModalTable(true);
    setPos(position);
  };

  const size =
    (Dimensions.get('window').width - 40 - 9 * Number(location?.columns)) /
    location?.columns;
  return (
    <View>
      {locId === location?.id && (
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
            {location.rows &&
              location.columns &&
              [
                ...Array.from(Array(location.rows * location.columns).keys()),
              ].map((number, index) => {
                const table = location?.tables?.find(
                  (tb) => tb.position === number,
                );

                if (table) {
                  return (
                    <Table
                      key={index}
                      size={size}
                      setSelected={setSelected}
                      selected={selected}
                      table={table}
                      index={index}
                      pub={pub}
                    />
                  );
                } else {
                  return (
                    <DummyTable
                      key={index}
                      size={size}
                      index={index}
                      addTable={addTable}
                    />
                  );
                }
              })}
          </View>
          <View>
            <Text style={{fontWeight: 'bold'}}>Legend</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                  backgroundColor: 'grey',
                  marginRight: 10,
                }}
              />
              <Text style={{marginRight: 20}}>Free</Text>
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                  backgroundColor: 'orange',
                  marginRight: 10,
                }}
              />
              <Text style={{marginRight: 20}}>Is reserved soon</Text>
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                  backgroundColor: theme.red,
                  marginRight: 10,
                }}
              />
              <Text style={{marginRight: 20}}>Reserved</Text>
            </View>
          </View>
          <AddTableModal
            position={pos}
            visible={modalTable}
            onClose={() => setModalTable(false)}
            locationId={location?.id}
          />
        </View>
      )}
    </View>
  );
};
export default TableTab;
