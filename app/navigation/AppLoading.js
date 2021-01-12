import React from 'react'
import Modal from 'react-native-modal';
import {View, Text} from 'react-native';
import LottieView from "lottie-react-native";
import * as Progress from 'react-native-progress';

export const AppLoading = ({isLoading, progress, text}) => {
    return (
        <Modal isVisible={isLoading} animationInTiming={1} animationOut={'fadeOut'} style={{flex: 1, margin: 0}}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#141716',
                zIndex: 100,
                elevation: 100,
            }}>
                <LottieView source={require('../assets/animations/running.json')} autoPlay loop
                            style={{width: '46%', marginTop: 1, marginLeft: -3}}/>
                <View style={{position: 'absolute', width: '100%', bottom: 100, alignItems: 'center'}}>
                    <Text style={{marginBottom: 10, color: '#fff', textAlign: 'center', padding: 50, paddingBottom: 0}}>
                        {text}
                    </Text>
                    <Progress.Bar progress={progress} width={200} color={'rgba(122,216,185,100)'}/>
                </View>
            </View>
        </Modal>
    )
}
