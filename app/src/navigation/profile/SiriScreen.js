import React, {useEffect} from 'react';
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {theme} from '../../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {lightVibration} from '../../helpers/vibrations';
import {
  clearAllShortcuts,
  clearShortcutsWithIdentifiers,
  presentShortcut,
  SiriShortcutsEvent,
  suggestShortcuts,
} from 'react-native-siri-shortcut';
import AddtoSiriButton, {
  SiriButtonStyles,
} from 'react-native-siri-shortcut/AddToSiriButton';

const opts = {
  activityType: 'com.meetup',
  title: 'Show me my meetup',
  userInfo: {
    foo: 1,
    bar: 'baz',
    baz: 34.5,
  },
  keywords: ['show', 'me', 'my', 'meetup'],
  persistentIdentifier: 'meetup',
  isEligibleForSearch: true,
  isEligibleForPrediction: true,
  suggestedInvocationPhrase: 'Show me my meetup',
  needsSave: true,
};

const SiriScreen = ({navigation}) => {
  const goBack = () => {
    lightVibration();
    navigation.goBack();
  };
  return (
    <View style={style.wrapper}>
      <View style={style.top}>
        <StatusBar barStyle={'light-content'} />
        <SafeAreaView style={style.topWrapper}>
          <View style={style.section}>
            <Ripple style={style.back} onPress={goBack}>
              <Icon name={'arrow-back'} color={theme.white} size={30} />
            </Ripple>
            <Text style={style.title}>Siri settings</Text>
          </View>
        </SafeAreaView>
      </View>
      <View style={style.content}>
        <Text style={style.text}>
          You can ask siri for your latest reservation only by asking.
        </Text>
        <AddtoSiriButton
          buttonStyle={SiriButtonStyles.whiteOutline}
          onPress={() => {
            presentShortcut(opts, () => {});
          }}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: theme.white},
  top: {
    backgroundColor: theme.black,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  topWrapper: {
    padding: 20,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {flexDirection: 'row', alignItems: 'center'},
  back: {marginRight: 10},
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: theme.white,
  },
  text: {fontWeight: '600', marginBottom: 20},
  content: {
    padding: 20,
    alignItems: 'center',
    flex: 1,
  },
});
export default SiriScreen;
