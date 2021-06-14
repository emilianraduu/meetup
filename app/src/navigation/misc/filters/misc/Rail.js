import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from '../../../../helpers/constants';

const Rail = () => {
  const {root} = styles;
  return <View style={root} />;
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.grey,
  },
});
