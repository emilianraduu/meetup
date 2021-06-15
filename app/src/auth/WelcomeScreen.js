import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {BIG_FONT_SIZE, theme} from '../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ripple from 'react-native-material-ripple';
import {lightVibration} from '../helpers/vibrations';
import LottieView from 'lottie-react-native';
import {LoginRoute} from '../helpers/routes';

const image = require('../assets/animations/welcome-new.json');

const WelcomeScreen = ({navigation}) => {
  const onPress = () => {
    lightVibration();
    navigation.navigate(LoginRoute);
  };
  // const onPressSecond = () => {
  //   lightVibration();
  //   navigation.navigate(EnterpriseLoginRoute);
  // };
  return (
    <View style={style.container}>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={style.wrapper}>
        <Text style={style.title}>Welcome</Text>
      </SafeAreaView>
      <View style={style.imageWrapper}>
        <LottieView
          source={image}
          autoPlay
          loop
          style={{width: 500, alignSelf: 'center', flex: 1}}
        />
      </View>
      <SafeAreaView style={style.buttonWrapper}>
        <Ripple rippleColor={'#fff'} onPress={onPress} style={style.button}>
          <Text style={style.buttonText}>Start now</Text>
        </Ripple>
        {/*<TouchableOpacity*/}
        {/*  onPress={onPressSecond}*/}
        {/*  style={style.secondButtonWrapper}>*/}
        {/*  <Text style={style.secondButtonText}>or login as enterprise</Text>*/}
        {/*</TouchableOpacity>*/}
      </SafeAreaView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {backgroundColor: theme.white, flex: 1},
  wrapper: {padding: 20, paddingBottom: 0},
  title: {
    fontSize: BIG_FONT_SIZE,
    color: theme.dark,
    fontWeight: 'bold',
  },
  imageWrapper: {
    backgroundColor: theme.dark,
    flex: 1,
    borderTopRightRadius: 60,
    justifyContent: 'center',
    padding: 20,
  },
  buttonWrapper: {
    backgroundColor: theme.dark,
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: theme.red,
    borderRadius: 10,
    width: 250,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  buttonText: {color: '#fff', marginLeft: 10},
  secondButtonWrapper: {
    marginTop: 30,
    alignSelf: 'center',
  },
  secondButtonText: {
    fontSize: 12,
    color: theme.darkGrey,
  },
});

export default WelcomeScreen;
