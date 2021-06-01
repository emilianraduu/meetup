import React, {useEffect, useState} from 'react';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {BIG_FONT_SIZE, GREEN_COLOR, theme} from '../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {lightVibration} from '../helpers/vibrations';
import {LOGIN_MUTATION, REGISTER_MUTATION} from '../graphql/mutations/User';
import {isLoggedIn, user} from '../helpers/variables';
import {useMutation} from 'react-apollo';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {LoginManager, AccessToken, GraphRequest} from 'react-native-fbsdk';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Loader} from '../customerNavigation/Loader';
import { PubRoute } from '../helpers/routes';

const PasswordScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});
  const [error, setError] = useState(false);
  const [login, {data}] = useMutation(LOGIN_MUTATION);
  const [register, {registerData}] = useMutation(REGISTER_MUTATION);

  useEffect(() => {
    if (registerData) {
      isLoggedIn(true);
      user(registerData?.login.user);
      AsyncStorage.setItem('accessToken', registerData.login.accessToken);
    } else {
      setError(true);
      setLoading(false);
    }
  }, [registerData]);

  useEffect(() => {
    if (data?.login?.accessToken) {
      isLoggedIn(true);
      user(data?.login.user);
      AsyncStorage.setItem('accessToken', data.login.accessToken);
    } else {
      setError(true);
      setLoading(false);
    }
  }, [data]);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register({
        variables: {
          email: values.email,
          password: values.password,
        },
      });

      setLoading(false);
    } catch (e) {
      setError(true);
      alert(e);
      setLoading(false);
    }
  };
  const initUser = (token) => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=' +
        token,
    )
      .then((response) => {
        response.json().then((json) => {
          console.log(json);
        });
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM FACEBOOK');
      });
  };
  const handleLogin = async () => {
    setLoading(true);
    try {
      // await login({
      //   variables: {
      //     email: values.email,
      //     password: values.password,
      //   },
      // });
      isLoggedIn(true);
      setLoading(false);
    } catch (e) {
      setError(true);
      console.log(e);
      handleRegister();
      setLoading(false);
    }
  };
  // const onDismiss = () => {
  //   setError(false);
  // };
  const goBack = () => {
    lightVibration();
    navigation.goBack();
  };
  const disabled = !values.email && !values.password;
  const onInputChange = ({key, value}) => {
    setValues({...values, [key]: value});
  };

  return (
    <ScrollView contentContainerStyle={style.scrollview}>
      <Loader loading={loading} />
      <SafeAreaView style={style.page}>
        <Ripple style={style.back} onPress={goBack}>
          <Icon name={'arrow-back'} color={theme.dark} size={30} />
        </Ripple>
        <Text style={style.title}>Sign in</Text>
      </SafeAreaView>
      <View style={style.inputWrapper}>
        <Text style={style.label}>Email</Text>
        <Text>{route?.params?.values?.email}</Text>
        <Text style={style.label}>Password</Text>
        <TextInput
          placeholder={'examplepass12'}
          placeholderTextColor={theme.grey}
          style={style.input}
          secureTextEntry={true}
          onChange={(e) =>
            onInputChange({key: 'password', value: e.nativeEvent.text})
          }
        />
      </View>
      <SafeAreaView style={style.buttonWrapper}>
        <Ripple
          rippleColor={GREEN_COLOR}
          onPress={handleLogin}
          disabled={disabled}
          style={disabled ? style.buttonDisabled : style.button}>
          <Text style={{color: theme.white}}>Login</Text>
        </Ripple>
      </SafeAreaView>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollview: {
    backgroundColor: theme.white,
    flex: 1,
  },
  facebook: {
    backgroundColor: '#3b5998',
    borderRadius: 5,
    width: 250,
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  google: {
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
  },
  page: {padding: 20, paddingBottom: 0, flexDirection: 'row'},
  back: {alignSelf: 'center', marginRight: 10},
  title: {
    fontSize: BIG_FONT_SIZE,
    color: theme.dark,
    fontWeight: 'bold',
  },
  inputWrapper: {
    backgroundColor: theme.dark,
    borderTopRightRadius: 60,
    padding: 20,
    borderBottomRightRadius: 60,
    justifyContent: 'center',
    marginRight: 20,
    flex: 1,
  },
  label: {
    color: theme.grey,
    marginBottom: 5,
  },
  buttonWrapper: {
    alignSelf: 'flex-end',
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  button: {
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
  },
  buttonDisabled: {
    backgroundColor: theme.black,
    borderRadius: 5,
    width: 250,
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  input: {
    color: theme.black,
    padding: 10,
    fontWeight: '600',
    backgroundColor: theme.white,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 15,
  },
});

export default PasswordScreen;
