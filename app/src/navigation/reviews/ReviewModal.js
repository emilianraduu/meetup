import BottomSheet from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../../helpers/constants';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';
import {useMutation, useReactiveVar} from '@apollo/client';
import {CREATE_REVIEW} from '../../graphql/mutations/Reviews';
import {user} from '../../helpers/variables';

const ReviewModal = ({isVisible, onDismiss, review}) => {
  const bottomSheetRef = useRef(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(undefined);
  const usr = useReactiveVar(user);
  const [create, {error}] = useMutation(CREATE_REVIEW);
  const snapPoints = useMemo(() => [-1, '65%'], []);

  const handleSheetChanges = useCallback((fromIndex, toIndex) => {
    if (fromIndex === 1 && toIndex === 0) {
      onClose();
    }
  }, []);
  const onClose = () => {};
  const submit = async () => {
    const response = await create({
      variables: {comment: comment, rating, pubId: review?.pub?.id},
    });
    if (response?.data?.createReview) {
      user({...usr, reviews: [...usr.reviews, response?.data?.createReview]});
      onDismiss();
    }
  };
  return (
    <Modal
      style={{flex: 1, margin: 0, zIndex: 100}}
      isVisible={isVisible}
      onBackdropPress={onClose}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onAnimate={handleSheetChanges}>
        <KeyboardAvoidingView
          behavior={'position'}
          style={{flex: 1}}
          keyboardVerticalOffset={100}
          enabled>
          <View style={{padding: 20}}>
            <Text style={{fontWeight: 'bold'}}>
              Tell us how your experience was at
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              {review?.pub?.name}
            </Text>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <StarRating
                disabled={false}
                selectedStar={(r) => setRating(r)}
                fullStarColor={theme.red}
                emptyStarColor={theme.red}
                halfStarColor={theme.red}
                maxStars={5}
                starSize={50}
                rating={rating}
                starStyle={{alignSelf: 'center', margin: 5}}
                activeOpacity={1}
              />
            </View>
            <TextInput
              placeholder={'Add your details about the experience'}
              placeholderTextColor={theme.darkGrey}
              value={comment}
              onChange={({nativeEvent: {text}}) => setComment(text)}
              style={{
                borderColor: theme.grey,
                marginTop: 20,
                borderRadius: 20,
                borderWidth: 1,
                padding: 10,
                height: 100,
              }}
              multiline={true}
            />
            <TouchableOpacity
              disabled={rating === 0}
              style={{
                backgroundColor: !rating ? theme.black : theme.red,
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 8,
                marginBottom: 50,
                alignSelf: 'center',
                marginTop: 70,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={submit}>
              <Text
                style={{
                  color: theme.white,
                  fontWeight: 'bold',
                  marginRight: 5,
                }}>
                Submit review
              </Text>
              <Icon name={'add-circle'} color={theme.white} size={20} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </BottomSheet>
    </Modal>
  );
};
export default ReviewModal;
