import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../../helpers/constants';

const RadioButton = ({isSelected, onPress, testID, label}) => {
  const styleProps = {isSelected};
  return (
    <View style={styles(styleProps).content}>
      <View style={styles(styleProps).border}>
        <TouchableOpacity
          testID={testID}
          onPress={onPress}
          style={styles(styleProps).checkContainer}
        />
      </View>
      <Text style={styles(styleProps).label}>{label}</Text>
    </View>
  );
};

export default RadioButton;

const styles = (props) =>
  StyleSheet.create({
    border: {
      borderColor: theme.red,
      borderRadius: 24,
      borderWidth: 1,
      padding: 2,
    },
    content: {alignItems: 'center', flexDirection: 'row'},
    checkContainer: {
      alignItems: 'center',
      backgroundColor: props.isSelected ? theme.red : 'transparent',
      borderRadius: 22,
      height: 22,
      justifyContent: 'center',
      width: 22,
    },
    label: {
      fontSize: 12,
      marginLeft: 10,
      textTransform: 'capitalize',
      color: theme.dark,
    },
  });
