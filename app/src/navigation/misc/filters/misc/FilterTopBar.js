import React, {useEffect, useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../../../helpers/constants';

const FilterTopBar = ({onClose, colors, index, pristine, onPress}) => {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext({
      duration: 150,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    setExpanded(index === 2);
  }, [index]);

  const {icon, button, content, smallContent, backButton, title} = style({
    expanded,
    colors,
  });
  return (
    <View style={content}>
      <View style={smallContent}>
        {expanded && (
          <View style={backButton}>
            <TouchableOpacity onPress={onClose}>
              <Icon name={'arrow-back'} size={20} color={theme.darkGrey} />
            </TouchableOpacity>
          </View>
        )}
        <Text style={title}>Filter</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={button}>Reset</Text>
        </TouchableOpacity>
      </View>
      {!expanded && (
        <TouchableOpacity onPress={onClose} style={icon}>
          <Icon name={'close'} size={20} color={theme.grey} />
        </TouchableOpacity>
      )}
    </View>
  );
};
const style = ({expanded}) =>
  StyleSheet.create({
    icon: {alignItems: 'flex-end'},
    button: {
      fontSize: 14,
      color: theme.black,
      marginLeft: expanded ? 0 : 26,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    smallContent: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    backButton: {flexGrow: expanded ? 1 : 0, alignItems: 'flex-start'},
    title: {
      fontWeight: '700',
      fontSize: 20,
      color: theme.black,
      flexGrow: expanded ? 1 : 0,
    },
  });
export default FilterTopBar;
