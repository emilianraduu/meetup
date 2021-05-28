import React, {useEffect, useState, useCallback, memo, useContext} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import randomLocation from 'random-location';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {pubs} from '../../dummyData';
import Swiper from 'react-native-swiper';
import {GREEN_COLOR, GREY_COLOR} from '../../helpers/constants';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import AnimatedInput from 'react-native-animated-input';
import Slider from 'rn-range-slider';
import {PubsContext, PubsProvider} from '../../contexts/pubContext';
import DollarIcon from 'react-native-vector-icons/FontAwesome';
import {PubRoute} from '../../helpers/routes';

const Label = ({text, ...restProps}) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#4499ff',
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});

const THUMB_RADIUS = 12;

const Thumb = () => {
  return <View style={styles2.root} />;
};

const styles2 = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: '#7f7f7f',
    backgroundColor: '#ffffff',
  },
});

const Notch = (props) => {
  return <View style={styles3.root} {...props} />;
};

const styles3 = StyleSheet.create({
  root: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4499ff',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
});

const Rail = () => {
  return <View style={styles4.root} />;
};

const styles4 = StyleSheet.create({
  root: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7f7f7f',
  },
});

const RailSelected = () => {
  return <View style={styles5.root} />;
};

const styles5 = StyleSheet.create({
  root: {
    height: 4,
    backgroundColor: '#4499ff',
    borderRadius: 2,
  },
});
export const MainScreen = ({navigation}) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);
  const [isVisible, setModalVisible] = useState(false);
  const {top} = useSafeAreaInsets();

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const {onSelectPub} = useContext(PubsContext);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);
  useEffect(() => {
    Geolocation.watchPosition(
      ({coords: {latitude, longitude}}) => {
        setLat(latitude);
        setLng(longitude);
      },
      (e) => console.log(e),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 500,
        distanceFilter: 10,
      },
    );
  });
  useEffect(() => {
    Geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setLat(latitude);
      setLng(longitude);
    });
  }, []);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    if (lat && lng) {
      if (locations.length < 5) {
        const obj = randomLocation.randomCirclePoint(
          {latitude: lat, longitude: lng},
          300,
        );

        if (!locations.includes(obj)) {
          setLocations([...locations, obj]);
        }
      }
    }
  }, [lat, lng, locations]);
  return (
    <View style={{flex: 1, marginTop: top}}>
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 20,
        }}>
        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 34, fontWeight: 'bold'}}>Explore</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(true);
            }}>
            <Icon name={'search'} size={20} style={{alignSelf: 'center'}} />
          </TouchableWithoutFeedback>
        </View>
        {pubs.map((pub, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 5.0,
              elevation: 1,
              borderRadius: 20,
              marginBottom: 15,
            }}>
            <View style={{borderRadius: 20, overflow: 'hidden'}}>
              <Swiper
                showsButtons={false}
                bounces={true}
                loop={false}
                showsPagination={false}
                containerStyle={{
                  height: 200,
                }}>
                {pub.photos.map((photo, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      navigation.navigate(PubRoute);
                      onSelectPub(pub.id);
                    }}>
                    <FastImage
                      style={{height: 200, width: '100%'}}
                      source={{uri: photo}}
                    />
                  </TouchableOpacity>
                ))}
              </Swiper>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(PubRoute);
                  onSelectPub(pub.id);
                }}
                style={{
                  backgroundColor: '#fff',
                  padding: 20,
                  zIndex: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      maxWidth: '60%',
                    }}>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                      {pub.name}
                    </Text>
                    <Text
                      style={{
                        color: GREY_COLOR,
                        fontSize: 12,
                        fontWeight: 'normal',
                      }}>
                      {pub.address}
                    </Text>
                  </View>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <DollarIcon
                        color={pub.price >= 1 ? GREEN_COLOR : GREY_COLOR}
                        size={15}
                        name={'dollar'}
                        style={{marginRight: 5}}
                      />
                      <DollarIcon
                        color={pub.price >= 2 ? GREEN_COLOR : GREY_COLOR}
                        name={'dollar'}
                        size={15}
                        style={{marginRight: 5}}
                      />
                      <DollarIcon
                        color={pub.price >= 3 ? GREEN_COLOR : GREY_COLOR}
                        size={15}
                        name={'dollar'}
                        style={{marginRight: 5}}
                      />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{}}>{pub.totalEmptyTables} free tables</Text>

                      <Icon
                        color={GREEN_COLOR}
                        size={15}
                        name={'table'}
                        style={{marginRight: 5}}
                      />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{}}>
                        {pub.stars} from {pub.reviews.length}
                      </Text>
                      <Icon
                        color={GREEN_COLOR}
                        size={15}
                        name={'star'}
                        style={{marginRight: 5}}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <Modal
        swipeDirection={'down'}
        propagateSwipe={true}
        isVisible={isVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
        }}
        style={{margin: 0}}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            marginTop: top,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#fff',
            flex: 1,
            padding: 20,
            paddingTop: 8,
            paddingBottom: 0,
          }}>
          <View
            style={{
              width: '15%',
              height: 4,
              alignSelf: 'center',
              borderRadius: 20,
              marginBottom: 20,
              backgroundColor: GREY_COLOR,
            }}
          />
          <View>
            <AnimatedInput
              placeholder={'Search'}
              style={{
                backgroundColor: 'red',
                height: 20,
                width: '100%',
                borderBottomWidth: 1,
                borderColor: GREY_COLOR,
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 5,
                top: '50%',
                transform: [{translateY: -10}],
              }}
              onPress={() => alert('aici')}>
              <Icon name={'search'} size={16} />
            </TouchableOpacity>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View onStartShouldSetResponder={() => true}>
              <View>
                <Text
                  style={{fontSize: 22, fontWeight: 'bold', marginBottom: 10}}>
                  Filters
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    marginBottom: 10,
                  }}>
                  Tags
                </Text>
                <View
                  style={{
                    flexWrap: 'wrap',
                    flex: 1,
                    flexDirection: 'row',
                  }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
                    <TouchableOpacity
                      key={i}
                      style={{
                        padding: 5,
                        borderWidth: 1,
                        borderRadius: 6,
                        marginBottom: 6,
                        marginRight: 6,
                        borderColor: GREY_COLOR,
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>Phone number</Text>
                        <Icon style={{marginLeft: 5}} name={'phone'} />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  marginBottom: 10,
                }}>
                Tags
              </Text>
              <View
                style={{
                  flexWrap: 'wrap',
                  flex: 1,
                  flexDirection: 'row',
                }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
                  <TouchableOpacity
                    key={i}
                    style={{
                      padding: 5,
                      borderWidth: 1,
                      borderRadius: 6,
                      marginBottom: 6,
                      marginRight: 6,
                      borderColor: GREY_COLOR,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text>Phone number</Text>
                      <Icon style={{marginLeft: 5}} name={'phone'} />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <Slider
              min={0}
              max={100}
              step={1}
              floatingLabel
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              renderNotch={renderNotch}
              onValueChanged={handleValueChange}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
