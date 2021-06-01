import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {BIG_FONT_SIZE, DARK_COLOR, theme} from '../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {lightVibration} from '../helpers/vibrations';
import {graphql, withApollo} from 'react-apollo';
import {LOGIN_MUTATION} from '../graphql/mutations/User';
import {Loader} from '../customerNavigation/Loader';

const ManagerScreen = ({navigation, mutate}) => {
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    const result = await mutate({
      variables: {
        email: 'emilian.radu@gmail.com',
        password: 'okokok123',
      },
    });

    if (result.data.login.accessToken) {
      console.log(result.data.login);
    }
  };

  return (
    <ScrollView style={{backgroundColor: theme.white, flex: 1}}>
      <Loader loading={loading} />
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
          Sign in
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
          onPress={handleLogin}
          style={{
            backgroundColor: '#dd4b39',
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
          <Ionicons name={'logo-google'} color={'#fff'} size={20} />
          <Text style={{color: '#fff', marginLeft: 10}}>
            Sign in with Google
          </Text>
        </Ripple>
      </SafeAreaView>
    </ScrollView>
  );
};
export default (withApollo, graphql(LOGIN_MUTATION))(ManagerScreen);
