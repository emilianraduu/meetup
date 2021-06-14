import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../../helpers/constants';
import Icon from 'react-native-vector-icons/Ionicons';

const CheckBox = ({isSelected, onPress, testID}) => {
  const styleProps = {isSelected};
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      style={styles(styleProps).checkContainer}>
      {isSelected && (
        <Icon
          name={'checkmark-outline'}
          size={20}
          style={{color: theme.white}}
        />
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = (props) =>
  StyleSheet.create({
    checkContainer: {
      alignItems: 'center',
      backgroundColor: props.isSelected ? theme.red : 'transparent',
      borderColor: theme.red,
      borderRadius: 6,
      borderWidth: 1,
      height: 24,
      justifyContent: 'center',
      width: 24,
    },
  });
