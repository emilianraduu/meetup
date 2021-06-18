import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useReactiveVar} from '@apollo/client';
import {selectedPub} from '../../helpers/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import LottieView from 'lottie-react-native';
import storage from '@react-native-firebase/storage';
import {Image} from 'react-native-elements';
import moment from 'moment';

const PubReviews = () => {
  const {bottom} = useSafeAreaInsets();
  const {container, empty} = styles({
    bottom,
  });
  const pub = useReactiveVar(selectedPub);
  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <BottomSheetScrollView contentContainerStyle={container}>
        {pub?.reviews?.length === 0 && (
          <View>
            {/*<LottieView*/}
            {/*  source={require('../../assets/animations/empty-stores.json')}*/}
            {/*  style={empty}*/}
            {/*/>*/}
            <Text style={{fontWeight: 'bold'}}>No reviews yet!</Text>
            <Text>Reviews will show up after people have seen your place</Text>
          </View>
        )}
        {pub?.reviews?.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </BottomSheetScrollView>
    </View>
  );
};

const ReviewCard = ({review}) => {
  const [image, setImage] = useState(undefined);
  useEffect(() => {
    if (review?.user?.photo) {
      const getUrl = async () => {
        return await storage().ref(review?.user?.photo).getDownloadURL();
      };
      getUrl().then((url) => {
        setImage(url);
      });
    }
  }, [review]);
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {image ? (
          <Image
            source={{uri: image}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              marginRight: 5,
            }}
          />
        ) : (
          <Ionicons
            name={'person-circle'}
            size={50}
            color={theme.red}
            style={{marginRight: 5}}
          />
        )}

        <View>
          <Text style={{fontWeight: 'bold'}}>
            {review.user.firstName} {review.user.lastName}
          </Text>
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
        </View>
      </View>
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
