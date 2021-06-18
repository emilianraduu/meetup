import {Dimensions, ScrollView, StatusBar, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../helpers/constants';
import LottieView from 'lottie-react-native';
import {useReactiveVar} from '@apollo/client';
import {user} from '../../helpers/variables';
import moment from 'moment';
import StarRating from 'react-native-star-rating';

export const ReviewScreen = () => {
  const {reviews} = useReactiveVar(user);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.white}}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}>
        <Text style={{fontSize: 34, fontWeight: 'bold', marginBottom: 40}}>
          Reviews
        </Text>
        {reviews?.length === 0 ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <LottieView
              source={require('../../assets/animations/empty-reviews.json')}
              loop={true}
              autoPlay={true}
              style={{
                width: Dimensions.get('window').width - 40,
                alignSelf: 'center',
              }}
            />
            <View style={{alignItems: 'center'}}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
                Seems like you haven't reviewed any pub yet!
              </Text>
            </View>
          </View>
        ) : (
          <View>
            {reviews.map((rev, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: theme.white,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.18,
                  shadowRadius: 5.0,
                  elevation: 1,
                  padding: 20,
                  marginBottom: 20,
                  borderRadius: 20,
                }}>
                <View style={{alignSelf: 'flex-start'}}>
                  <StarRating
                    disabled={true}
                    fullStarColor={theme.red}
                    emptyStarColor={theme.red}
                    halfStarColor={theme.red}
                    maxStars={5}
                    rating={rev.rating}
                    starSize={16}
                    activeOpacity={1}
                  />
                </View>
                <Text style={{color: theme.black, fontWeight: 'bold'}}>
                  {rev.pub.name}
                </Text>
                <Text style={{color: theme.black, fontWeight: 'bold'}}>
                  {rev.pub.address}
                </Text>
                <Text style={{color: theme.black, fontWeight: 'bold'}}>
                  {moment(Number(rev.createdAt)).format('HH:mm DD.MM.YYYY')}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
