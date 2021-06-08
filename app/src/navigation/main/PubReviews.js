import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {theme} from '../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import {useReactiveVar} from '@apollo/client';
import {selectedPub} from '../../helpers/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

const PubReviews = () => {
  const {bottom} = useSafeAreaInsets();
  const {container, empty} = styles({
    bottom,
  });
  const pub = useReactiveVar(selectedPub);
  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <BottomSheetScrollView contentContainerStyle={container}>
        {/*<LottieView*/}
        {/*  source={require('../../assets/animations/empty-stores.json')}*/}
        {/*  loop={true}*/}
        {/*  autoPlay={true}*/}
        {/*  style={empty}*/}
        {/*/>*/}
        {pub?.reviews?.map((review) => (
          <View key={review.id}>
            <StarRating
              disabled={false}
              fullStarColor={theme.red}
              emptyStarColor={theme.red}
              halfStarColor={theme.red}
              maxStars={5}
              rating={review.rating}
              starSize={16}
              activeOpacity={1}
            />
            <Text>{review.comment}</Text>
            <Text>
              {review.user.firstName} {review.user.lastName}
            </Text>
            <Ionicons name={review.image} size={20} color={theme.dark} />
          </View>
        ))}
      </BottomSheetScrollView>
    </View>
  );
};
const styles = ({bottom}) =>
  StyleSheet.create({
    container: {
      padding: 20,
      flexGrow: 1,
      paddingBottom: bottom + 30,
    },
    empty: {
      width: Dimensions.get('window').width - 40,
      alignSelf: 'center',
    },
  });
export default PubReviews;
