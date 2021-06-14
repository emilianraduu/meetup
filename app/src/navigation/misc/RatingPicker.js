import React from 'react';

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {theme} from '../../helpers/constants';
import StarRating from 'react-native-star-rating';

const RatingPicker = ({colorOptions, onPress}) => {
  return (
    <View style={style({}).wrapper}>
      {colorOptions.map((option, index) => (
        <View key={index} style={style({option}).optionWrapper}>
          <TouchableOpacity
            onPress={() => onPress(option)}
            style={style({option}).button}>
            <StarRating
              disabled={true}
              fullStarColor={option.selected ? theme.red : theme.grey}
              emptyStarColor={option.selected ? theme.red : theme.grey}
              halfStarColor={option.selected ? theme.red : theme.grey}
              maxStars={5}
              rating={option.name}
              starSize={16}
              activeOpacity={1}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const style = ({option}) =>
  StyleSheet.create({
    wrapper: {marginHorizontal: 5},
    optionWrapper: {marginRight: 12, marginBottom: 12},
    button: {
      borderRadius: 24,
      alignSelf: 'flex-start',
      zIndex: 2,
    },
  });

export default RatingPicker;
