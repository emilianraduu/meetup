import {theme} from '../../../helpers/constants';
import Icon from 'react-native-vector-icons/Entypo';
import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import {useReactiveVar} from '@apollo/client';
import {date} from '../../../helpers/variables';
import Modal from 'react-native-modal';

const Table = ({index, pub, table, selected, size, setSelected, waiter}) => {
  const [waiterModal, setWaiterModal] = useState(false);
  const currentDate = useReactiveVar(date);
  const isSame = table?.reservations?.find?.((res) => {
    const day = moment(currentDate);
    const reservation = moment(Number(res?.date));
    const reservationEnd = moment(Number(res?.date)).add(
      pub.reservationTime,
      'hours',
    );
    return day.isBetween(reservation, reservationEnd, null, '[]');
  });
  const isSoon = table?.reservations?.find?.((res) => {
    const day = moment(currentDate).add(pub.reservationTime, 'hours');
    const reservation = moment(Number(res?.date));
    const reservationEnd = moment(Number(res?.date)).add(
      pub.reservationTime,
      'hours',
    );
    return day.isBetween(reservation, reservationEnd, null, '[]');
  });
  return (
    <>
      <TouchableOpacity
        key={index}
        disabled={table?.blocked}
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
        onPress={
          waiter ? () => setWaiterModal(true) : () => setSelected(table)
        }>
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
      <Modal
        onBackdropPress={() => setWaiterModal(false)}
        onBackButtonPress={() => setWaiterModal(false)}
        onSwipeComplete={() => setWaiterModal(false)}
        swipeDirection={'down'}
        propagateSwipe={true}
        style={{margin: 0, flex: 1}}
        isVisible={waiterModal}>
        <View
          style={{
            backgroundColor: theme.white,
            padding: 20,
            margin: 20,
            height: 200,
            borderRadius: 20,
          }}
        />
      </Modal>
    </>
  );
};

export default Table;
