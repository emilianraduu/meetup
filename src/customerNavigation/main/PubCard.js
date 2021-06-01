import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {PubRoute} from '../../helpers/routes';
import FastImage from 'react-native-fast-image';
import {theme} from '../../helpers/constants';
import DollarIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import StarRating from 'react-native-star-rating';

const PubCard = ({index, pub, navigation, onSelectPub}) => {
  return (
    <View key={index} style={style.wrapper}>
      <View style={{borderRadius: 20, overflow: 'hidden'}}>
        <Swiper
          showsButtons={false}
          bounces={true}
          loop={false}
          showsPagination={false}
          containerStyle={{
            height: 200,
          }}>
          {pub.photos.map((photo, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                navigation.navigate(PubRoute);
                onSelectPub(pub.id);
              }}>
              <FastImage
                style={{height: 200, width: '100%'}}
                source={{uri: photo}}
              />
            </TouchableOpacity>
          ))}
        </Swiper>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(PubRoute);
            onSelectPub(pub.id);
          }}
          style={style.processable}>
          <View style={style.space}>
            <View style={style.left}>
              <Text style={style.title}>{pub.name}</Text>
              <Text style={style.address}>{pub.address}</Text>
              <View style={style.section}>
                <Text style={style.distance}>15 min</Text>
                <Icon
                  name={'shoe-prints'}
                  size={12}
                  color={theme.red}
                  style={{marginLeft: 5, alignSelf: 'center'}}
                />
              </View>
            </View>
            <View style={style.right}>
              <View style={style.section}>
                <Text style={style.tables}>
                  {pub.totalEmptyTables} free tables
                </Text>
              </View>
              <View style={style.section}>
                {[1, 2, 3].map((i) => (
                  <DollarIcon
                    key={i}
                    color={pub.price >= i ? theme.red : theme.grey}
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
                  rating={pub.stars}
                  starSize={16}
                  activeOpacity={1}
                  starStyle={style.star}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
    justifyContent: 'flex-end',
    maxWidth: '60%',
  },
  title: {fontSize: 24, fontWeight: 'bold'},
  address: {
    color: theme.grey,
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
