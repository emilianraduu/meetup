import React from 'react';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

export const Loader = ({loading}) => {
  return (
    <Modal
      isVisible={loading}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      style={{flex: 1, margin: 0, zIndex: 100}}>
      <LottieView
        source={require('../assets/animations/loading.json')}
        autoPlay
        loop
        style={{width: '30%', alignSelf: 'center'}}
      />
    </Modal>
  );
};
