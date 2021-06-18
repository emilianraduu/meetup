import {View} from 'react-native';
import Table from './table/Table';
import DummyTable from './table/DummyTable';
import React from 'react';

const WaiterTableList = ({
  tables,
  location,
  size,
  selected,
  setSelected,
  item,
  pub,
}) => (
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
      location.id === item.id &&
      [...Array.from(Array(location.rows * location.columns).keys())].map(
        (number, index) => {
          const table = tables?.find(
            (tb) => tb.position === number && tb.locationId === location.id,
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
                waiter={true}
                pub={pub}
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
);
export default WaiterTableList;
