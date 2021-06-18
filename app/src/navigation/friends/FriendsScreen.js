import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../helpers/constants';
import LottieView from 'lottie-react-native';
import {useLazyQuery, useMutation, useReactiveVar} from '@apollo/client';
import {user, userFriends} from '../../helpers/variables';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {FIND_USERS, GET_FRIENDS} from '../../graphql/queries/User';
import {Image} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import {ADD_FRIEND} from '../../graphql/mutations/User';
import {Loader} from '../Loader';
import moment from 'moment';

const FriendsScreen = () => {
  const usr = useReactiveVar(user);
  const [showModal, setShowModal] = useState(false);
  const [add, {loading: loadingAdd}] = useMutation(ADD_FRIEND);
  const [get, {loading: loadingGet, data}] = useLazyQuery(GET_FRIENDS);
  const friends = useReactiveVar(userFriends);

  useEffect(() => {
    get();
  }, []);
  useEffect(() => {
    if (
      data?.findFriends &&
      friends &&
      friends.length === 0 &&
      data.findFriends.length !== 0
    ) {
      userFriends(data.findFriends);
    }
  }, [data, friends]);

  const addFriend = async (item) => {
    try {
      const response = await add({
        variables: {userId: usr.id, friendId: item.id},
      });
      if (response?.data?.addFriend) {
        userFriends([...friends, response?.data?.addFriend]);
        setShowModal(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={style.container}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={style.scroll}>
        <Loader loading={loadingGet} />
        <Text style={style.title}>Friends</Text>
        {friends?.length === 0 && (
          <View style={style.emptyWrapper}>
            <LottieView
              source={require('../../assets/animations/friends.json')}
              loop={true}
              autoPlay={true}
              style={style.lottie}
            />
            <View style={style.bottomText}>
              <Text style={style.emptyText}>
                Seems like you haven't added any friends yet!
              </Text>
            </View>
          </View>
        )}
        <View style={{marginTop: 30}}>
          {friends?.map((friend) => (
            <Friend
              key={friend.id}
              createdAt={friend?.createdAt}
              item={friend?.friend}
              onPress={() => ({})}
            />
          ))}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: theme.red,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginBottom: 50,
            alignSelf: 'center',
            marginTop: 50,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => setShowModal(true)}>
          <Text
            style={{color: theme.white, fontWeight: 'bold', marginRight: 5}}>
            Add friend
          </Text>
          <Icon name={'add-circle'} color={theme.white} size={20} />
        </TouchableOpacity>
      </ScrollView>
      {showModal && (
        <AddModal
          showModal={showModal}
          setShowModal={setShowModal}
          loadingAdd={loadingAdd}
          addFriend={addFriend}
        />
      )}
    </SafeAreaView>
  );
};

const AddModal = ({showModal, setShowModal, loadingAdd, addFriend}) => {
  const [email, setEmail] = useState('');
  const [find, {data, loading}] = useLazyQuery(FIND_USERS);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [-1, '65%'], []);
  const handleSheetChanges = useCallback((fromIndex, toIndex) => {
    if (fromIndex === 1 && toIndex === 0) {
      setShowModal(false);
    }
  }, []);
  const search = async () => {
    try {
      await find({variables: {email}});
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal
      style={{flex: 1, margin: 0, zIndex: 100}}
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        style={{padding: 20}}
        onAnimate={handleSheetChanges}>
        <View style={{flexDirection: 'row', marginBottom: 30}}>
          <TextInput
            placeholder={'Search by email'}
            value={email}
            onChange={({nativeEvent: {text}}) => setEmail(text)}
            placeholderTextColor={theme.darkGrey}
            style={{
              borderBottomWidth: 2,
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 5,
              borderBottomColor: theme.red,
              flex: 1,
            }}
          />
          <TouchableOpacity onPress={search}>
            <Icon name={'search'} size={20} />
          </TouchableOpacity>
        </View>

        <BottomSheetScrollView>
          {data?.findUsers?.map((item) => (
            <Friend key={item.id} item={item} onPress={addFriend} />
          ))}
          {(!data || data?.findUsers?.length === 0) && (
            <Text
              style={{
                fontWeight: 'bold',
                alignSelf: 'center',
                marginTop: 50,
              }}>
              No results found
            </Text>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
      <Loader loading={loading || loadingAdd} />
    </Modal>
  );
};

const Friend = ({item, onPress, createdAt}) => {
  const [image, setImage] = useState(undefined);
  useEffect(() => {
    if (item?.photo) {
      const getUrl = async () => {
        return await storage().ref(item?.photo).getDownloadURL();
      };
      getUrl().then((url) => {
        setImage(url);
      });
    }
  }, [item]);
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={style.section}>
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
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item?.email}</Text>
        {createdAt && (
          <Text>
            Friends since {moment(item.createdAt).format('DD-MM-YYYY')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FriendsScreen;

const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: theme.white},
  scroll: {
    padding: 20,
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.grey,
    padding: 5,
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
