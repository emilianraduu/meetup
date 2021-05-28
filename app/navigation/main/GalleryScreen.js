import {
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DARK_COLOR} from '../../helpers/constants';
import FastImage from 'react-native-fast-image';
import {PubsContext} from '../../contexts/pubContext';

export const GalleryScreen = ({navigation, route}) => {
  const {
    selectedPub: {photos},
  } = useContext(PubsContext);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />
      <TouchableOpacity
        style={{
          elevation: 1,
          zIndex: 100,
          padding: 15,
        }}
        onPress={() => navigation.goBack()}>
        <Icon name={'arrow-left'} size={24} color={DARK_COLOR} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          flexWrap: 'wrap',
          flexDirection: 'row',
          padding: 12,
        }}>
        {photos.map((image, index) => (
          <View
            key={index}
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 5.0,
              elevation: 1,
            }}>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderRadius: 6,
                overflow: 'hidden',
                marginVertical: 5,
                marginHorizontal: 5,
              }}>
              <FastImage
                source={{uri: image}}
                style={{
                  width: (Dimensions.get('window').width - 55) / 3,
                  height: (Dimensions.get('window').width - 55) / 3,
                }}
                resizeMode={'cover'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
