import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PubsContext} from '../../contexts/pubContext';
import {GalleryRoute} from '../../helpers/routes';
import {theme} from '../../helpers/constants';
import PubTabs from './Tabs';
import Sheet from './Sheet';

const styles = StyleSheet.create({
  content: {
    marginTop: 50,
  },
  foreground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  message: {
    color: 'white',
    fontSize: 40,
    paddingTop: 24,
    paddingBottom: 7,
  },
  headerWrapper: {
    backgroundColor: 'green',
    width: '100%',
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    margin: 12,
  },
  tabsWrapper: {
    paddingVertical: 12,
  },
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18,
  },
  tabTextContainerActiveStyle: {
    backgroundColor: 'lightgreen',
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white',
  },
});

const PubScreen = ({navigation, route}) => {
  const {top} = useSafeAreaInsets();
  const {selectedPub: pub} = useContext(PubsContext);
  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <StatusBar barStyle="light-content" />
      <View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: top,
            elevation: 1,
            zIndex: 100,
            padding: 15,
          }}
          onPress={() => navigation.goBack()}>
          <Icon name={'arrow-left'} size={24} color={'#fff'} />
        </TouchableOpacity>
        <View>
          <Swiper
            showsButtons={false}
            bounces={true}
            loop={false}
            showsPagination={false}
            containerStyle={{
              height: 200 + top,
              flex: 0,
            }}>
            {pub.photos.map((photo, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate(GalleryRoute, {gallery: pub.photos});
                }}>
                <FastImage
                  style={{height: 200 + top, width: '100%'}}
                  source={{uri: photo}}
                />
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>
      </View>
      <Sheet pub={pub}>
        <PubTabs />
      </Sheet>
    </View>
  );
};

export default PubScreen;
