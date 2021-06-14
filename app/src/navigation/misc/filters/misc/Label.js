import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '../../../../helpers/constants';

const Label = ({text, colors, ...restProps}) => {
  const {textStyle, root} = styles({colors});
  return (
    <View style={root} {...restProps}>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

const styles = ({colors}) =>
  StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 8,
      borderRadius: 4,
      backgroundColor: theme.white,
    },
    textStyle: {
      fontSize: 12,
      color: theme.dark,
    },
  });

export default memo(Label);
