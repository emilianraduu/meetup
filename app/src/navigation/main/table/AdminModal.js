import Modal from 'react-native-modal';
import {SafeAreaView, Text, View} from 'react-native';
import {theme} from '../../../helpers/constants';
import React, {useCallback, useMemo, useRef} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';

const AdminModal = ({onClose, isVisible, table}) => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => [-1, '65%', '100%'], []);

  const handleSheetChanges = useCallback((fromIndex, toIndex) => {
    if (fromIndex === 1 && toIndex === 0) {
      onClose();
    }
  }, []);
  return (
    <Modal
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={'down'}
      propagateSwipe={true}
      style={{margin: 0, flex: 1}}
      isVisible={isVisible}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        handleComponent={null}
        snapPoints={snapPoints}
        onAnimate={handleSheetChanges}>
        <SafeAreaView style={{flex: 1}}>
          <BottomSheetScrollView style={{flex: 1}}>
            <View style={{flex: 1, margin: 20}}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                {table.name}
              </Text>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                {table.count}
              </Text>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                {table.name}
              </Text>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                {table.name}
              </Text>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                {table.name}
              </Text>
            </View>
          </BottomSheetScrollView>
        </SafeAreaView>
      </BottomSheet>
    </Modal>
  );
};

export default AdminModal;
