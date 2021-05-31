import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {BIG_FONT_SIZE, DARK_COLOR, theme} from '../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {lightVibration} from '../helpers/vibrations';
import {ManagerRoute, WaiterRoute} from '../helpers/routes';

const EnterpriseLoginScreen = ({navigation}) => {
  return (
    <ScrollView style={{backgroundColor: theme.white, flex: 1}}>
      <SafeAreaView
        style={{padding: 20, paddingBottom: 0, flexDirection: 'row'}}>
        <Ripple
          style={{alignSelf: 'center', marginRight: 10}}
          onPress={() => {
            lightVibration();
            navigation.goBack();
          }}>
          <Icon name={'arrow-back'} color={theme.dark} size={30} />
        </Ripple>
        <Text
          style={{
            fontSize: BIG_FONT_SIZE,
            color: theme.dark,
            fontWeight: 'bold',
          }}>
          Enterprise
        </Text>
      </SafeAreaView>
      <View
        style={{
          backgroundColor: theme.dark,
          borderTopRightRadius: 60,
          padding: 20,
          borderBottomRightRadius: 60,
          marginRight: 20,
        }}>
        <LottieView
          source={require('../assets/animations/burger.json')}
          autoPlay
          loop
          style={{width: 300, alignSelf: 'center'}}
        />
      </View>
      <SafeAreaView
        style={{
          alignSelf: 'flex-end',
          width: '100%',
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
        }}>
        <Ripple
          rippleColor={DARK_COLOR}
          onPress={() => navigation.navigate(ManagerRoute)}
          style={{
            backgroundColor: theme.dark,
            borderRadius: 5,
            width: 250,
            height: 50,
            marginBottom: 10,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            overflow: 'hidden',
            alignSelf: 'center',
          }}>
          <Text style={{color: '#fff'}}>Login as Manager</Text>
        </Ripple>
        <Ripple
          rippleColor={theme.green}
          onPress={() => navigation.navigate(WaiterRoute)}
          style={{
            backgroundColor: theme.red,
            borderRadius: 5,
            width: 250,
            height: 50,
            marginBottom: 10,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            overflow: 'hidden',
            alignSelf: 'center',
          }}>
          <Text style={{color: theme.white}}>Login as Waiter</Text>
        </Ripple>
      </SafeAreaView>
    </ScrollView>
  );
};
export default EnterpriseLoginScreen;
