import React from 'react';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

export const Loader = ({isLoading}) => {
    return (
        <Modal isVisible={isLoading} animationInTiming={1} animationOut={'fadeOut'} style={{flex: 1, margin: 0}}>

                <LottieView source={require('../assets/animations/running.json')} autoPlay loop
                            style={{width: '46%', marginTop: 1, marginLeft: -2}}/>

        </Modal>
    );
};
