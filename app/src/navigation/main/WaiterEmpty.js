import {Dimensions, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';

const WaiterEmpty = ({locations}) => (
  <View style={{alignItems: 'flex-start', marginBottom: 20}}>
    <View style={{flex: 1, justifyContent: 'center'}}>
      <LottieView
        source={require('../../assets/animations/empty-reviews.json')}
        loop={true}
        autoPlay={true}
        style={{
          width: Dimensions.get('window').width - 40,
          alignSelf: 'center',
        }}
      />
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Seems like you aren't assigned to any table!
        </Text>
      </View>
    </View>
  </View>
);
export default WaiterEmpty;
