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
import {isLoggedIn, token, user} from '../helpers/variables';
import {useMutation} from '@apollo/client';
import {Loader} from '../navigation/Loader';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {validatePassword} from '../helpers/validators';
import storage from '@react-native-firebase/storage';

const PasswordScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});
  const [error, setError] = useState('');
  const [login] = useMutation(LOGIN_MUTATION);
  const [register] = useMutation(REGISTER_MUTATION);
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    const getUrl = async () => {
      return await storage().ref(route?.params?.photo).getDownloadURL();
    };
    if (route?.params?.photo) {
      getUrl().then((url) => {
        setPhoto(url);
      });
    }
  }, [route]);

  const handleRegister = async () => {
    if (validatePassword(values.password)) {
      setLoading(true);
      try {
        const response = await register({
          variables: {
            email: route?.params?.email,
            password: values.password,
          },
        });
        AsyncStorage.setItem(
          'accessToken',
          response?.data?.signup?.accessToken,
        );
        token(response?.data?.login?.accessToken);
        user(response?.data?.signup?.user);
        isLoggedIn(true);
        setLoading(false);
      } catch (e) {
        setError();
        alert(e);
        setLoading(false);
      }
    } else {
      setError('Password should have 6 characters');
    }
  };
  const handleLogin = async () => {
    if (validatePassword(values.password)) {
      setLoading(true);
      try {
        const response = await login({
          variables: {
            email: route?.params?.email,
            password: values.password,
          },
        });
        AsyncStorage.setItem('accessToken', response?.data?.login?.accessToken);
        user(response?.data?.login?.user);
        token(response?.data?.login?.accessToken);
        isLoggedIn(true);
        setLoading(false);
      } catch (e) {
        alert(e);
        isLoggedIn(false);
        setLoading(false);
      }
    } else {
      setError('Password should have 6 characters');
    }
  };
  const goBack = () => {
    lightVibration();
    navigation.goBack();
  };
  const disabled = !values.email && !values.password;
  const onInputChange = ({key, value}) => {
    if (error !== '') {
      setError('');
    }
    setValues({...values, [key]: value});
  };

  return (
    <ScrollView contentContainerStyle={style.scrollview}>
      <Loader loading={loading} />
      <SafeAreaView style={style.page}>
        <Ripple style={style.back} onPress={goBack}>
          <Icon name={'arrow-back'} color={theme.dark} size={30} />
        </Ripple>
        <Text style={style.title}>
          {route?.params?.exist ? 'Sign in' : 'Register'}
        </Text>
      </SafeAreaView>
      <View style={style.inputWrapper}>
        <View style={style.section}>
          {photo ? (
            <FastImage
              source={{uri: photo}}
              style={{width: 50, height: 50, borderRadius: 50, marginRight: 5}}
            />
          ) : (
            <Ionicons
              name={'person-circle'}
              size={50}
              color={theme.white}
              style={{marginRight: 5}}
            />
          )}
          <View>
            <Text style={style.label}>{route?.params?.email}</Text>
          </View>
        </View>
        <Text style={style.label}>Password</Text>
        <TextInput
          placeholder={'examplepass12'}
          placeholderTextColor={theme.grey}
          style={style.input}
          onSubmitEditing={route?.params?.exist ? handleLogin : handleRegister}
          secureTextEntry={true}
          onChange={(e) =>
            onInputChange({key: 'password', value: e.nativeEvent.text})
          }
        />
        <Text style={style.errorText}>{error}</Text>
      </View>
      <SafeAreaView style={style.buttonWrapper}>
        <Ripple
          rippleColor={GREEN_COLOR}
          onPress={route?.params?.exist ? handleLogin : handleRegister}
          disabled={disabled}
          style={disabled ? style.buttonDisabled : style.button}>
          <Text style={{color: theme.white}}>
            {route?.params?.exist ? 'Login' : 'Register'}
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
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: theme.red,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default PasswordScreen;
