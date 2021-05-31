import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import RadioButton from './RadioButton';

const MultipleRadio = ({options, onPress}) => {
  return options.map((option, index) => (
    <View style={style.wrapper}>
      <RadioButton
        key={index}
        label={option.name}
        onPress={() => onPress(option)}
        isSelected={option.selected}
        testID={option}
      />
    </View>
  ));
};

const style = StyleSheet.create({
  wrapper: {marginBottom: 12},
});

export default MultipleRadio;
