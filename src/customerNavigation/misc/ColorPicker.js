import React from 'react';

import {StyleSheet, TouchableOpacity, View} from 'react-native';

const ColorPicker = ({colorOptions, onPress}) => {
  return (
    <View style={style({}).wrapper}>
      {colorOptions.map((option, index) => (
        <View key={index} style={style({option}).optionWrapper}>
          {option.selected && <View style={style({option}).selected} />}
          <TouchableOpacity
            onPress={() => onPress(option)}
            style={style({option}).button}>
            <View />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const style = ({option}) =>
  StyleSheet.create({
    wrapper: {flexDirection: 'row', marginHorizontal: 5},
    optionWrapper: {justifyContent: 'center', marginRight: 12},
    selected: {
      position: 'absolute',
      width: 34,
      height: 34,
      borderWidth: 2,
      borderRadius: 34,
      alignSelf: 'center',
      zIndex: 1,
      borderColor: option?.name,
    },
    button: {
      height: 24,
      width: 24,
      backgroundColor: option?.name,
      borderRadius: 24,
      alignSelf: 'center',
      justifyContent: 'center',
      zIndex: 2,
    },
  });

export default ColorPicker;
