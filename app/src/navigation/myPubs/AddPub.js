import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../helpers/constants';

const AddPub = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="add-circle" size={24} color={theme.black} />
    </TouchableOpacity>
  );
};

export default AddPub;
