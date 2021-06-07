import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CheckBox from './CheckBox';
import {theme} from '../../helpers/constants';

const MultipleCheckbox = ({options, onPress}) => {
  const {label, wrapper} = style;
  return (
    <>
      {options?.map((option, index) => (
        <View key={index} style={wrapper}>
          <CheckBox
            isSelected={option.selected}
            onPress={() => onPress(option)}
            testID={option}
          />
          <Text style={label}>{option.name}</Text>
        </View>
      ))}
    </>
  );
};

const style = StyleSheet.create({
  label: {
    color: theme.dark,
    marginLeft: 10,
    fontSize: 12,
    textTransform: 'capitalize',
  },
  wrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
});

export default MultipleCheckbox;
