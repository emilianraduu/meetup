import React, {useEffect, useState} from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PubRoute} from '../../helpers/routes';
import {theme} from '../../helpers/constants';
import DollarIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import StarRating from 'react-native-star-rating';
import storage from '@react-native-firebase/storage';
import Swiper from 'react-native-swiper';
import {Image} from 'react-native-elements';
import {date, lat, long, pubImages, selectedPub} from '../../helpers/variables';
import {useReactiveVar} from '@apollo/client';
import moment from 'moment';

const PubCard = ({index, navigation, onSelectPub, pub}) => {
  const images = useReactiveVar(pubImages);
  const [currentImage, setCurrentImage] = useState(undefined);
  useEffect(() => {
    if (pub && pub.images) {
      pub.images.forEach(async (i) => {
        const imageUrl = await storage().ref(i.toString()).getDownloadURL();
        setCurrentImage({uri: imageUrl, name: i});
      });
    }
  }, [pub]);

  useEffect(() => {
    if (pub && images[pub.id]) {
      if (
        images[pub.id].filter((e) => e.name === currentImage?.name).length <
          1 &&
        currentImage
      ) {
        pubImages({...images, [pub.id]: [...images[pub.id], currentImage]});
      }
    }

    if (pub && images && !images[pub.id] && currentImage) {
      pubImages({...images, [pub.id]: [currentImage]});
    }
  }, [images, currentImage, pub]);

  return (
    <View key={index} style={style.wrapper}>
      <View style={{borderRadius: 20, overflow: 'hidden'}}>
        <View style={{height: 200}}>
          {images?.[pub?.id] && (
            <Swiper
              showsButtons={false}
              bounces={true}
              loop={false}
              showsPagination={false}
              containerStyle={{
                height: 200,
              }}>
              {images?.[pub?.id].map((photo, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    navigation.navigate(PubRoute);
                    selectedPub(pub);
                    onSelectPub?.();
                  }}>
                  <Image
                    style={{height: 200, width: '100%'}}
                    source={{uri: photo.uri}}
                  />
                </TouchableOpacity>
              ))}
            </Swiper>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(PubRoute);
            selectedPub(pub);
            onSelectPub?.();
          }}
          style={style.processable}>
          <PubDetails pub={pub} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const PubDetails = ({pub, wrapperStyle}) => {
  const currentDate = useReactiveVar(date);
  let freeTables = 0;
  for (const item in pub?.locations) {
    if (pub?.locations?.[item]?.tables) {
      freeTables += pub?.locations?.[item]?.tables?.length;
    }
  }
  if (pub?.reservations?.length > 0 && pub) {
    for (const it in pub?.reservations) {
      const res = pub?.reservations[it];
      const day = moment(currentDate);
      const reservation = moment(Number(res?.date));
      const reservationEnd = moment(Number(res?.date)).add(
        pub.reservationTime,
        'hours',
      );
      if (day.isBetween(reservation, reservationEnd, null, '[]')) {
        // freeTables -= 1;
      }
    }
  }
  return (
    <View style={[style.space, wrapperStyle]}>
      <View style={style.left}>
        <Text style={style.title}>{pub?.name}</Text>
        <Text style={style.address}>{pub?.address}</Text>
        {pub?.distance && (
          <View style={style.section}>
            <Text style={style.distance}>{pub?.distance}m</Text>
            <Icon
              name={'shoe-prints'}
              size={12}
              color={theme.red}
              style={{marginLeft: 5, alignSelf: 'center'}}
            />
          </View>
        )}
      </View>
      <View style={style.right}>
        <View style={style.section}>
          <Text style={style.tables}>{freeTables} free tables</Text>
        </View>
        <View style={style.section}>
          {[1, 2, 3].map((i) => (
            <DollarIcon
              key={i}
              color={pub?.priceAvg < i - 1 ? theme.darkGrey : theme.red}
              size={15}
              name={'dollar'}
              style={{marginRight: 5}}
            />
          ))}
        </View>
        <View style={style.section}>
          <StarRating
            disabled={false}
            fullStarColor={theme.red}
            emptyStarColor={theme.red}
            halfStarColor={theme.red}
            maxStars={5}
            rating={pub?.avgRating}
            starSize={16}
            activeOpacity={1}
            starStyle={style.star}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  section: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  wrapper: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5.0,
    elevation: 1,
    borderRadius: 20,
    marginBottom: 15,
  },
  processable: {
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 10,
  },
  space: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    maxWidth: '60%',
  },
  title: {fontSize: 24, fontWeight: 'bold'},
  address: {
    color: theme.darkGrey,
    fontSize: 12,
    fontWeight: 'normal',
  },
  tables: {
    fontWeight: '600',
    fontSize: 12,
  },
  distance: {
    color: theme.red,
    fontSize: 12,
    fontWeight: '700',
  },
  right: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default PubCard;
