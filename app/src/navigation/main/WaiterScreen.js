import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../helpers/constants';
import LottieView from 'lottie-react-native';
import {useReactiveVar} from '@apollo/client';
import {user} from '../../helpers/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WaiterScreen = ({navigation, route}) => {
  const usr = useReactiveVar(user);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.white}}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          padding: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 34, fontWeight: 'bold'}}>
            {usr?.pub?.name}
          </Text>
          <TouchableOpacity>
            <Ionicons name={'notifications'} size={25} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <LottieView
            source={require('../../assets/animations/empty-reviews.json')}
            loop={true}
            autoPlay={true}
            style={{
              width: '100%',
              alignSelf: 'center',
            }}
          />
          <View style={{alignItems: 'center'}}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
              Seems like you haven't reviewed any pub yet!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default WaiterScreen;
