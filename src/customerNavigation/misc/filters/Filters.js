import React, {useCallback, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {useSafeArea} from 'react-native-safe-area-context';
import FilterButton from './misc/FilterButton';
import CustomBackground from './misc/CustomBackground';
import FilterContent from './misc/FilterContent';
import Modal from 'react-native-modal';

const Filters = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [animation] = useState(new Animated.Value(0));
  const {top} = useSafeArea();
  const bottomSheetRef = useRef();
  const onButtonPress = () => {
    setIsVisible(true);
  };
  const onClose = () => {
    setIndex(0);
    setIsVisible(false);
    animate(0);
  };
  const animate = (i) => {
    Animated.timing(animation, {
      toValue: i === 2 ? top : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const handleSheetAnimation = useCallback(
    (fromIndex, toIndex) => {
      if (fromIndex === 1 && toIndex === 2) {
        animate(2);
        setIndex(index);
      }
      if (fromIndex === 1 && toIndex === 0) {
        onClose();
      }
    },
    [index],
  );

  const handleSheetChanges = useCallback((index: number) => {
    setIndex(index);
    animate(index);
  }, []);
  return (
    <>
      <FilterButton onButtonPress={onButtonPress} colors={{}} />
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        style={styles.modal}
        animationIn={'slideInUp'}
        onBackButtonPress={onClose}>
        <BottomSheet
          handleComponent={null}
          ref={bottomSheetRef}
          index={1}
          enableContentPanningGesture={index === 1}
          enableHandlePanningGesture={index === 1}
          onAnimate={handleSheetAnimation}
          onChange={handleSheetChanges}
          backgroundComponent={({...props}) => (
            <CustomBackground index={index} {...props} />
          )}
          animateOnMount={true}
          snapPoints={[-1, '75%', '100%']}>
          <FilterContent
            animation={animation}
            index={index}
            onClose={onClose}
            colors={{}}
          />
        </BottomSheet>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    overflow: 'visible',
  },
});

export default Filters;
