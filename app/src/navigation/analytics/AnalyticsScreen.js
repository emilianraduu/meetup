import React from 'react';
import {Dimensions, ScrollView, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../helpers/constants';
import LottieView from 'lottie-react-native';

const AnalyticsScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.white}}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          flexWrap: 'wrap',
          padding: 20,
        }}>
        <Text style={{fontSize: 34, fontWeight: 'bold'}}>Analytics</Text>
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
              style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
              Seems like you don't have any pub yet!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyticsScreen;