import React, {useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Dimensions, FlatList, StatusBar, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../../helpers/constants';
import Filters from '../misc/filters/Filters';
import PubCard from './PubCard';
import Map from '../misc/map/Map';
import LottieView from 'lottie-react-native';
import {useLazyQuery, useReactiveVar} from '@apollo/client';
import {PUBS_QUERY} from '../../graphql/queries/Pubs';
import {lat, long, pubs, user} from '../../helpers/variables';
import {Loader} from '../Loader';
import dayjs from 'dayjs';

export const MainScreen = ({navigation}) => {
  const latitude = useReactiveVar(lat);
  const longitude = useReactiveVar(long);
  const usr = useReactiveVar(user);
  const {top} = useSafeAreaInsets();
  const [pubQuery, {loading, data, error}] = useLazyQuery(PUBS_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const pubList = useReactiveVar(pubs);
  useEffect(() => {
    Geolocation.watchPosition(
      ({coords: {latitude: lt, longitude: lg}}) => {
        lat(lt);
        long(lg);
      },
      (e) => console.log(e),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 500,
        distanceFilter: 10,
      },
    );
  });

  const getNextUserReservation = () => {
    if (usr?.reservations && usr?.reservations.length > 0) {
      const today = new Date();
      return usr.reservations?.reduce?.((a, b) => {
        return a.date - today < b.date - today ? a : b;
      });
      // const next = ((reservation) => {
      //   if (reservation?.startHour) {
      //
      //     console.log(dayjs(reservation.date).hour(hours).minute(minutes));
      //   }
      // });
    }
  };

  useEffect(() => {
    if (data) {
      pubs(data.pubs);
    }
    if (error) {
      alert(JSON.stringify(error));
    }
  }, [data, error]);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords: {latitude: lt, longitude: lg}}) => {
        lat(lt);
        long(lg);
      },
    );
  }, []);
  useEffect(() => {
    if (latitude && longitude && usr?.maxDistance) {
      pubQuery({variables: {lat: latitude, long: longitude}});
    }
  }, [latitude, longitude, pubQuery, usr]);
  const nextReservation = getNextUserReservation();
  const emptyList = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <LottieView
          source={require('../../assets/animations/empty-stores.json')}
          loop={true}
          autoPlay={true}
          style={{
            width: Dimensions.get('window').width - 40,
            alignSelf: 'center',
          }}
        />
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
            Seems like there isn't anything near you yet!
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, paddingTop: top, backgroundColor: theme.white}}>
      <StatusBar barStyle={'dark-content'} />
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            paddingTop: 20,
            alignItems: 'center',
            marginBottom: 20,
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 34, fontWeight: 'bold'}}>Explore</Text>
          <View style={{flexDirection: 'row'}}>
            <Map latitude={latitude} longitude={longitude} />
            <Filters />
          </View>
        </View>
        <Loader loading={loading} />
        {pubList && (
          <FlatList
            data={pubList}
            refreshing={loading}
            style={{padding: 20}}
            contentContainerStyle={{paddingBottom: 20}}
            ListEmptyComponent={emptyList}
            onRefresh={() => {
              pubQuery({variables: {lat: latitude, long: longitude}});
            }}
            renderItem={({item: pub, index}) => (
              <PubCard
                key={index}
                navigation={navigation}
                index={index}
                pub={pub}
              />
            )}
          />
        )}
        {nextReservation && (
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text>
                Your next reservation is at {nextReservation.startHour} on{' '}
                {dayjs(nextReservation.date).format('d')}
              </Text>
              <Text> </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
