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
import { PasswordRoute } from '../helpers/routes';

const LoginScreen = ({navigation}) => {
  const [values, setValues] = useState({});
  const handleLogin = () => {
    navigation.navigate(PasswordRoute, {values} )
  }
  const goBack = () => {
    lightVibration();
    navigation.goBack();
  };
  const disabled = !values.email && !values.password;
  const onInputChange = ({key, value}) => {
    setValues({...values, [key]: value});
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
  const fbLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login was cancelled');
        } else {
          console.log(result);
          let req = new GraphRequest(
            '/me',
            {
              httpMethod: 'GET',
              version: 'v2.5',
              parameters: {
                fields: {
                  string: 'email,name,friends',
                },
              },
            },
            (err, res) => {
              console.log(err, res);
            },
          );
          console.log(req);
          AccessToken.getCurrentAccessToken().then((accessToken) =>
            initUser(accessToken.accessToken),
          );
          checkPermissions().then((hasPermissions) => {
            navigation.navigate('CameraScreen');
          });
        }
      },
      function (error) {
        console.log('Login failed with error: ' + error);
      },
    );
  };

  const googleLogin = async () => {
    try {
      GoogleSignin.configure();
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // this.setState({ userInfo });
        console.log(userInfo);
        // checkPermissions().then((hasPermissions) => {
        //   customerNavigation.navigate('CameraScreen');
        // });
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    } catch (error) {
      // this.errorPopUp()
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={style.scrollview}>
      <SafeAreaView style={style.page}>
        <Ripple style={style.back} onPress={goBack}>
          <Icon name={'arrow-back'} color={theme.dark} size={30} />
        </Ripple>
        <Text style={style.title}>Sign in</Text>
      </SafeAreaView>
      <View style={style.inputWrapper}>
        <Text style={style.label}>Email</Text>
        <TextInput
          placeholder={'example@email.com'}
          style={style.input}
          autoCapitalize={'none'}
          placeholderTextColor={theme.grey}
          autoCorrect={false}
          onChange={(e) =>
            onInputChange({key: 'email', value: e.nativeEvent.text})
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
        <Text style={{fontSize: 12, marginBottom: 10}}>or</Text>
        <Ripple
          rippleColor={GREEN_COLOR}
          onPress={fbLogin}
          style={style.facebook}>
          <Ionicons name={'logo-facebook'} color={'#fff'} size={20} />
          <Text style={{color: '#fff', marginLeft: 10}}>
            Sign in with Facebook
          </Text>
        </Ripple>
        <Ripple
          rippleColor={theme.dark}
          onPress={googleLogin}
          style={style.google}>
          <Ionicons name={'logo-google'} color={'#fff'} size={20} />
          <Text style={{color: '#fff', marginLeft: 10}}>
            Sign in with Google
          </Text>
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

export default LoginScreen;
