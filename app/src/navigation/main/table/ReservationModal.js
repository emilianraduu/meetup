import Modal from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {theme} from '../../../helpers/constants';

const ReservationModal = ({visible, onClose}) => {
  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      style={style.modal}
      swipeDirection={'down'}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View style={style.content}>
        <Text>123</Text>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  content: {
    backgroundColor: theme.white,
    borderRadius: 20,
    padding: 20,
    flex: 1,
  },
  modal: {justifyContent: 'flex-end'},
});

export default ReservationModal;
