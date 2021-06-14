import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from '../../../../helpers/constants';

const THUMB_RADIUS = 12;

const Thumb = () => {
  const {root} = styles;
  return <View style={root} />;
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: theme.grey,
    backgroundColor: theme.white,
  },
});

export default memo(Thumb);
