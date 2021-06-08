import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../helpers/constants';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import {useReactiveVar} from '@apollo/client';
import {pubImages, selectedPub} from '../../helpers/variables';

export const GalleryScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const pub = useReactiveVar(selectedPub);
  const {top} = useSafeAreaInsets();
  const images = useReactiveVar(pubImages);
  const [index, setIndex] = useState(undefined);
  const photosUri = images?.[pub?.id].map((uri) => ({uri}));
  return (
    <View style={{flex: 1, backgroundColor: theme.white, paddingTop: top}}>
      <StatusBar barStyle={'dark-content'} />
      <View style={style.title}>
        <TouchableOpacity
          style={style.back}
          onPress={() => navigation.goBack()}>
          <Icon name={'arrow-left'} size={24} color={theme.dark} />
        </TouchableOpacity>
        <Text style={style.titleText}>Gallery</Text>
      </View>

      <ScrollView contentContainerStyle={style.scrollView}>
        {images[pub?.id].map((image, i) => (
          <View key={i} style={style.shadow}>
            <TouchableOpacity
              onPress={() => {
                setIndex(i);
                setVisible(true);
              }}
              style={style.wrapper}>
              <FastImage
                source={{uri: image}}
                style={style.image}
                resizeMode={'cover'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <ImageView
        images={photosUri}
        imageIndex={index}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
          setIndex(undefined);
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  image: {
    width: (Dimensions.get('window').width - 55) / 3,
    height: (Dimensions.get('window').width - 55) / 3,
  },
  wrapper: {
    borderRadius: 6,
    overflow: 'hidden',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5.0,
    elevation: 1,
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 12,
  },
  back: {
    elevation: 1,
    zIndex: 100,
    marginRight: 15,
  },
  title: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {fontSize: 34, fontWeight: 'bold'},
});