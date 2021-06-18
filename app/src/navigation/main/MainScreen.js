import React, {useEffect, useState} from 'react';
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
import {lat, long, pubs, selectedDistance, user} from '../../helpers/variables';
import {Loader} from '../Loader';
import NextReservation from './NextReservation';
import {getDistance} from 'geolib';
import ReviewModal from '../reviews/ReviewModal';

export const MainScreen = ({navigation}) => {
  const latitude = useReactiveVar(lat);
  const longitude = useReactiveVar(long);
  const usr = useReactiveVar(user);
  const {top} = useSafeAreaInsets();
  const [pubQuery, {loading, data, error}] = useLazyQuery(PUBS_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const [showReview, setShowReview] = useState(undefined);
  useEffect(() => {
    const history = usr?.reservations?.filter((res) => res.finished);
    history.map((item) => {
      const findIndex = usr?.reviews?.findIndex(
        (rev) => rev.pubId === item.pubId,
      );
      if (findIndex === -1) {
        setShowReview(item);
      }
    });
  }, [usr]);
  const maxDistance = useReactiveVar(selectedDistance);

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
    if (usr?.reservations && usr?.reservations?.length > 0) {
      const today = new Date();
      return usr.reservations?.reduce?.((a, b) => {
        return !a.finished && !b.finished && a.date - today < b.date - today
          ? a
          : b;
      });
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
    if (latitude && longitude && maxDistance) {
      pubQuery({variables: {lat: latitude, long: longitude, maxDistance}});
    }
  }, [maxDistance, latitude, longitude, pubQuery, usr]);
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
  const sortedList = () => {
    let list = pubList.map((pub) => {
      if (pub?.latitude && pub?.longitude && latitude && longitude) {
        const distance = getDistance(
          {latitude, longitude},
          {
            latitude: pub.latitude,
            longitude: pub.longitude,
          },
        );
        return {...pub, distance};
      }
    });
    return list.sort((a, b) => a.distance > b.distance);
  };
  return (
    <View style={{flex: 1, paddingTop: top, backgroundColor: theme.white}}>
      <StatusBar barStyle={'dark-content'} />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.white,
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
            {latitude && longitude && (
              <Map latitude={latitude} longitude={longitude} />
            )}
            <Filters />
          </View>
        </View>
        {pubList && (
          <FlatList
            data={sortedList()}
            refreshing={loading}
            style={{padding: 20}}
            keyExtractor={(item, index) => index}
            contentContainerStyle={{paddingBottom: 20}}
            ListEmptyComponent={emptyList}
            onRefresh={() => {
              pubQuery({
                variables: {lat: latitude, long: longitude, maxDistance},
              });
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
        {nextReservation && !nextReservation.finished && (
          <NextReservation nextReservation={nextReservation} />
        )}
        {showReview && (
          <ReviewModal
            review={showReview}
            isVisible={showReview}
            onDismiss={() => setShowReview(undefined)}
          />
        )}
      </View>
    </View>
  );
};
