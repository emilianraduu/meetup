import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../helpers/constants';
import LottieView from 'lottie-react-native';

export const HistoryScreen = () => {
  return (
    <SafeAreaView style={style.container}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={style.scroll}>
        <Text style={style.title}>History</Text>
        <View style={style.emptyWrapper}>
          <LottieView
            source={require('../../assets/animations/empty.json')}
            loop={true}
            autoPlay={true}
            style={style.lottie}
          />
          <View style={style.bottomText}>
            <Text style={style.emptyText}>
              Seems like you haven't visited any pub yet!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: theme.white},
  scroll: {
    padding: 20,
  },
  title: {fontSize: 34, fontWeight: 'bold'},
  emptyWrapper: {flex: 1, justifyContent: 'center'},
  lottie: {
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
  },
  bottomText: {alignItems: 'center'},
  emptyText: {fontSize: 20, fontWeight: 'bold', textAlign: 'center'},
});
