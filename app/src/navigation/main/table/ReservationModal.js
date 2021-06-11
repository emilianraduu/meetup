import Modal from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {theme} from '../../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ReservationModal = ({visible, onClose, children}) => {
  const {top} = useSafeAreaInsets();
  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      style={[style.modal, {paddingTop: 20 + top}]}
      swipeDirection={'down'}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View style={style.content}>{children}</View>
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
  modal: {justifyContent: 'flex-end', margin: 0},
});

export default ReservationModal;
