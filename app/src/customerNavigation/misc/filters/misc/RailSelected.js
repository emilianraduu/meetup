import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from '../../../../helpers/constants';

const RailSelected = () => {
  const {root} = styles;
  return <View style={root} />;
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 4,
    backgroundColor: theme.red,
    borderRadius: 2,
  },
});
