import BottomSheet from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef} from 'react';
import Modal from 'react-native-modal';
import {Text, View} from 'react-native';

const ErrorModal = ({isVisible, onDismiss}) => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => [-1, '65%'], []);

  const handleSheetChanges = useCallback((fromIndex, toIndex) => {
    if (fromIndex === 1 && toIndex === 0) {
      onDismiss();
    }
  }, []);
  return (
    <Modal
      style={{flex: 1, margin: 0, zIndex: 100}}
      isVisible={isVisible}
      onBackdropPress={onDismiss}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onAnimate={handleSheetChanges}>
        <View>
          <Text>123</Text>
        </View>
      </BottomSheet>
    </Modal>
  );
};
export default ErrorModal;
