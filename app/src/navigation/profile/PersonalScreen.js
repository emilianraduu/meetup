import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme, user_status} from '../../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {lightVibration} from '../../helpers/vibrations';
import {useMutation, useReactiveVar} from '@apollo/client';
import {user} from '../../helpers/variables';
import {UPDATE_DATA_MUTATION} from '../../graphql/mutations/User';
import Slider from 'rn-range-slider';
import {FILTER_DATA} from '../misc/filters/misc/FilterContent';
import Thumb from '../misc/filters/misc/Thumb';
import Rail from '../misc/filters/misc/Rail';
import RailSelected from '../misc/filters/misc/RailSelected';
import Label from '../misc/filters/misc/Label';

export const PersonalScreen = ({navigation}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [pristine, setPristine] = useState(true);
  const usr = useReactiveVar(user);
  const [low, setLow] = useState(FILTER_DATA.SLIDER.LOW_VALUE);
  const [high, setHigh] = useState(FILTER_DATA.SLIDER.HIGH_VALUE);
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <View />, []);
  const [values, setValues] = useState({
    email: usr?.email,
    firstName: usr?.firstName,
    lastName: usr?.lastName,
    maxDistance: usr?.maxDistance,
  });
  const [updateUserData, {loading, data, error}] = useMutation(
    UPDATE_DATA_MUTATION,
  );
  useEffect(() => {
    if (data?.updateUser) {
      user(data.updateUser);
    }
    if (error) {
      alert(error);
    }
  }, [data, error]);
  const disabled = !pristine && !values.firstName && !values.lastName;
  const onInputChange = useCallback(
    ({key, value}) => {
      if (pristine) {
        setPristine(false);
      }
      setValues({...values, [key]: value});
    },
    [pristine, values],
  );

  const goBack = () => {
    lightVibration();
    navigation.goBack();
  };
  const handleValueChange = useCallback(
    (h) => {
      setHigh(h);
      onInputChange({key: 'maxDistance', value: h});
    },
    [pristine],
  );
  const onPress = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      updateUserData({
        variables: {
          firstName: values.firstName ? values.firstName : '',
          lastName: values.lastName ? values.lastName : '',
          email: values.email,
          id: usr?.id,
          maxDistance: values.maxDistance,
        },
      });
    }
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
            <Text style={style.title}>Profile Info</Text>
          </View>
          <TouchableOpacity onPress={onPress} disabled={disabled}>
            <Text style={[style.edit, {opacity: disabled ? 0.5 : 1}]}>
              {isEditing ? 'Done' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <ScrollView>
        <View style={style.row}>
          <View style={style.section}>
            <Ionicon
              name={'mail-outline'}
              color={theme.dark}
              size={20}
              style={style.rowIcon}
            />
            <Text>Email</Text>
          </View>
          <Text>{usr?.email}</Text>
        </View>
        <View style={style.row}>
          <View style={style.section}>
            <Ionicon
              name={'ios-person-outline'}
              color={theme.dark}
              size={20}
              style={style.rowIcon}
            />
            <Text>First Name</Text>
          </View>
          {isEditing || loading ? (
            <TextInput
              onChange={(e) =>
                onInputChange({key: 'firstName', value: e.nativeEvent.text})
              }
              placeholder={'First name'}
              placeholderTextColor={theme.grey}
              style={style.textInput}
              defaultValue={usr?.firstName}
            />
          ) : (
            <Text>{usr?.firstName ? usr?.firstName : '-'}</Text>
          )}
        </View>
        <View style={style.row}>
          <View style={style.section}>
            <Ionicon
              name={'ios-person-outline'}
              color={theme.dark}
              size={20}
              style={style.rowIcon}
            />
            <Text>Last Name</Text>
          </View>
          {isEditing || loading ? (
            <TextInput
              onChange={(e) =>
                onInputChange({key: 'lastName', value: e.nativeEvent.text})
              }
              placeholder={'Last name'}
              placeholderTextColor={theme.grey}
              style={style.textInput}
              defaultValue={usr?.lastName}
            />
          ) : (
            <Text>{usr?.lastName ? usr?.lastName : '-'}</Text>
          )}
        </View>
        {usr.status !== user_status.admin && (
          <View style={style.row}>
            <View style={style.section}>
              <Ionicon
                name={'ios-map-outline'}
                color={theme.dark}
                size={20}
                style={style.rowIcon}
              />
              <Text>Max distance</Text>
            </View>

            <Text>{values?.maxDistance}m</Text>
          </View>
        )}
        {isEditing && usr.status !== user_status.admin && (
          <View style={style.slider}>
            <Slider
              min={50}
              disableRange={true}
              max={10000}
              step={FILTER_DATA.SLIDER.STEP}
              low={values?.maxDistance}
              floatingLabel
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              renderNotch={renderNotch}
              onValueChanged={handleValueChange}
            />
          </View>
        )}
      </ScrollView>
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
  edit: {color: theme.white},
  slider: {
    padding: 20,
  },
  row: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  rowIcon: {
    marginRight: 10,
  },
  textInput: {
    height: 20,
  },
});
