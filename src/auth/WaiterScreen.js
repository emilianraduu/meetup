import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {BIG_FONT_SIZE, theme} from '../helpers/constants';
import {graphql, withApollo} from 'react-apollo';
import {LOGIN_MUTATION} from '../graphql/mutations/User';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Ripple from 'react-native-material-ripple';
import {lightVibration} from '../helpers/vibrations';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

const WaiterScreen = ({navigation, mutate}) => {
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
          Login
        </Text>
      </SafeAreaView>
      <View style={{borderRadius: 20, margin: 15}}>
        <QRCodeScanner
          onRead={this.onSuccess}
          bottomContent={
            <TouchableOpacity>
              <Text>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
      </View>
    </ScrollView>
  );
};
export default (withApollo, graphql(LOGIN_MUTATION))(WaiterScreen);
