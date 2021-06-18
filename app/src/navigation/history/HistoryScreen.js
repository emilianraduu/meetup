import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {BIG_FONT_SIZE, theme} from '../../helpers/constants';
import LottieView from 'lottie-react-native';
import {useReactiveVar} from '@apollo/client';
import {user} from '../../helpers/variables';
import moment from 'moment';
import MapView, {Marker} from 'react-native-maps';

export const HistoryScreen = () => {
  const usr = useReactiveVar(user);
  const history = usr?.reservations?.filter((res) => res.finished);
  const {top} = useSafeAreaInsets();
  return (
    <View style={[style.container, {paddingTop: top}]}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={style.scroll}>
        <Text style={style.title}>History</Text>
        {history.length === 0 ? (
          <View style={style.emptyWrapper}>
            <LottieView
              source={require('../../assets/animations/empty.json')}
              loop={true}
              autoPlay={true}
              style={style.lottie}
            />
            <View style={style.bottomText}>
              <Text style={style.emptyText}>
                Seems like you haven't visited any pub yet!
              </Text>
            </View>
          </View>
        ) : (
          <View style={{marginTop: 20}}>
            {history.map((item, index) => (
              <HistoryCard key={index} item={item} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const HistoryCard = ({item}) => {
  const start = moment(Number(item.date));
  const end = moment(Number(item.date)).add(
    item?.pub?.reservationTime,
    'hours',
  );
  return (
    <View
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 5.0,
        elevation: 1,
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        backgroundColor: theme.white,
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.pub.name}</Text>
      <Text style={{fontSize: 12, fontWeight: 'bold', color: theme.red}}>
        {item.pub.address}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 12, fontWeight: 'bold'}}>
          {start.format('HH:mm')} - {end.format('HH:mm')}
        </Text>
        <Text style={{fontSize: 12, fontWeight: 'bold'}}>
          {start.format('DD.MM.YYYY')}
        </Text>
      </View>
      <Text style={{fontSize: 12, fontWeight: 'bold'}}>
        {item?.location?.name} - {item?.table?.count} persons
      </Text>
      {item?.pub.latitude && item?.pub.longitude && (
        <MapView
          scrollEnabled={false}
          pitchEnabled={false}
          style={{
            height: 200,
            borderRadius: 20,
            overflow: 'hidden',
            marginTop: 10,
          }}
          initialRegion={{
            latitude: item?.pub?.latitude,
            longitude: item?.pub?.longitude,
            latitudeDelta: 0.122,
            longitudeDelta: 0.1421,
          }}>
          <Marker
            coordinate={{
              latitude: item?.pub.latitude,
              longitude: item?.pub.longitude,
            }}
          />
        </MapView>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: theme.white},
  scroll: {
    padding: 20,
  },
  title: {fontSize: 34, fontWeight: 'bold'},
  emptyWrapper: {flex: 1, justifyContent: 'center'},
  lottie: {
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
  },
  bottomText: {alignItems: 'center'},
  emptyText: {fontSize: 20, fontWeight: 'bold', textAlign: 'center'},
});
