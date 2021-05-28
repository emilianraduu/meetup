import {ScrollView, StatusBar, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

export const ReviewScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          flexWrap: 'wrap',
          flexDirection: 'row',
          padding: 20,
        }}>
        <Text style={{fontSize: 34, fontWeight: 'bold'}}>Reviews</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
