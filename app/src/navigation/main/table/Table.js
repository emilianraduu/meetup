import {theme} from '../../../helpers/constants';
import Icon from 'react-native-vector-icons/Entypo';
import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useReactiveVar} from '@apollo/client';
import {date} from '../../../helpers/variables';
import AdminModal from './AdminModal';

const Table = ({
  index,
  pub,
  table,
  selected,
  size,
  setSelected,
  waiter,
  render,
  setRender,
}) => {
  const [waiterModal, setWaiterModal] = useState(false);
  const currentDate = useReactiveVar(date);
  useEffect(() => {
    date(new Date());
  }, []);
  const isSame = table?.reservations?.find?.((res) => {
    if (!res.finished) {
      const day = moment(currentDate);
      const reservation = moment(Number(res?.date));
      const reservationEnd = moment(Number(res?.date)).add(
        pub?.reservationTime,
        'hours',
      );
      return day.isBetween(reservation, reservationEnd, null, '[]');
    }
  });

  const isSoon = table?.reservations?.find?.((res) => {
    if (!res.finished) {
      const day = moment(currentDate).add(pub?.reservationTime, 'hours');
      const reservation = moment(Number(res?.date));
      const reservationEnd = moment(Number(res?.date)).add(
        pub?.reservationTime,
        'hours',
      );
      return day.isBetween(reservation, reservationEnd, null, '[]');
    }
  });

  const onPress = () => {
    if (waiter) {
      setWaiterModal(true);
    } else {
      if (!isSame) {
        setSelected(table);
      }
    }
  };
  return (
    <>
      <TouchableOpacity
        key={index}
        disabled={table?.blocked && !waiter}
        style={{
          opacity: table?.blocked ? 0.5 : 1,
          borderRadius: 6,
          margin: 3,
          borderWidth: 2,
          borderColor:
            isSoon && !isSame
              ? 'orange'
              : isSame
              ? 'red'
              : table
              ? selected?.id === table?.id
                ? theme.green
                : theme.darkGrey
              : 'transparent',
          width: size,
          height: size,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onPress}>
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
                    color: theme.darkGrey,
                    fontWeight: 'bold',
                  }}>
                  {table?.count}
                </Text>
                <Icon name={'user'} color={theme.darkGrey} />
              </View>
            </>
          )
        )}
      </TouchableOpacity>
      <AdminModal
        onClose={() => setWaiterModal(false)}
        table={table}
        render={render}
        setRender={setRender}
        isVisible={waiterModal}
      />
    </>
  );
};

export default Table;
