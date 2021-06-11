import {Share, StatusBar, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GalleryRoute} from '../../helpers/routes';
import {theme} from '../../helpers/constants';
import PubTabs from './Tabs';
import Sheet from './Sheet';
import {useLazyQuery, useReactiveVar} from '@apollo/client';
import {
  lat,
  long,
  pubImages,
  selectedLocation,
  selectedPub,
} from '../../helpers/variables';
import {PUB_QUERY} from '../../graphql/queries/Pubs';
import {Loader} from '../Loader';

const PubScreen = ({navigation, route}) => {
  const images = useReactiveVar(pubImages);
  const {top} = useSafeAreaInsets();
  const pub = useReactiveVar(selectedPub);
  const latitude = useReactiveVar(lat);
  const longitude = useReactiveVar(long);
  const [pubQuery, {loading, data, error, called}] = useLazyQuery(PUB_QUERY);
  useEffect(() => {
    if (pub?.id && !called) {
      pubQuery({
        variables: {id: pub.id, latitude, longitude},
      });
    }
  }, [called, latitude, longitude, pub, pubQuery]);
  useEffect(() => {
    if (data?.pub) {
      selectedPub(data?.pub);
    }
    if (error) {
      console.log(JSON.stringify(error));
    }
  }, [data, error]);
  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <StatusBar barStyle="dark-content" />
      <Loader loading={loading} />
      <>
        <View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: top,
              elevation: 1,
              zIndex: 100,
              padding: 10,
              borderRadius: 50,
              left: 10,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            onPress={() => {
              navigation.goBack();
              selectedLocation(undefined);
            }}>
            <Icon name={'arrow-left'} size={24} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: top,
              elevation: 1,
              zIndex: 100,
              padding: 10,
              borderRadius: 50,
              right: 10,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            onPress={() => {
              Share.share({
                message: 'Check out this location!',
              });
            }}>
            <Icon name={'share'} size={24} color={'#fff'} />
          </TouchableOpacity>
          <View>
            {images[pub?.id] && (
              <Swiper
                showsButtons={false}
                bounces={true}
                loop={false}
                showsPagination={false}
                containerStyle={{
                  height: 200 + top,
                  flex: 0,
                }}>
                {images[pub.id].map((photo, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.9}
                    onPress={() => {
                      navigation.navigate(GalleryRoute, {
                        gallery: pub.photos,
                      });
                    }}>
                    <FastImage
                      style={{height: 200 + top, width: '100%'}}
                      source={{uri: photo.uri}}
                    />
                  </TouchableOpacity>
                ))}
              </Swiper>
            )}
          </View>
        </View>
        <Sheet pub={pub}>
          <PubTabs />
        </Sheet>
      </>
    </View>
  );
};

export default PubScreen;
