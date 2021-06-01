import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {theme} from '../../../../helpers/constants';

export const FilterButton = ({onButtonPress}) => {
  return (
    <TouchableOpacity onPress={onButtonPress}>
      <Icon name="ios-search" size={24} color={theme.black} />
    </TouchableOpacity>
  );
};
export default FilterButton;
