import {
  Dimensions,
  LayoutAnimation,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme, user_status} from '../../helpers/constants';
import {Image} from 'react-native-elements';
import ImageView from 'react-native-image-viewing';
import {useMutation, useReactiveVar} from '@apollo/client';
import {pubImages, selectedPub, user} from '../../helpers/variables';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {UPDATE_PUB} from '../../graphql/mutations/Pub';

export const GalleryScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [images, setImages] = useState(undefined);
  const pub = useReactiveVar(selectedPub);
  const usr = useReactiveVar(user);
  const {top} = useSafeAreaInsets();
  const cachedImages = useReactiveVar(pubImages);
  const [index, setIndex] = useState(undefined);
  const [updatePub, {data, error}] = useMutation(UPDATE_PUB);

  const onEdit = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    setImages(undefined);
  }, []);

  useEffect(() => {
    if (data?.updatePub) {
      selectedPub(data?.updatePub);
    }
    if (error) {
      console.log(JSON.stringify(error));
    }
  }, [error, data]);

  useEffect(() => {
    LayoutAnimation.configureNext({
      duration: 150,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      useNativeDriver: true,
      update: {type: LayoutAnimation.Types.easeInEaseOut},
    });
  }, [images, editing]);
  useEffect(() => {
    if (cachedImages && !images) {
      setImages(cachedImages);
    }
  }, [cachedImages, images]);
  const removeImage = async (image) => {
    const newImages = images;
    const i = newImages?.[pub?.id].findIndex(
      (neededImage) => neededImage === image,
    );
    if (i !== -1) {
      newImages?.[pub?.id]?.splice(i, 1);
    }
    setImages({...newImages});
    updatePub({
      variables: {
        images: [...pub.images].filter((it) => it !== image.name),
        id: pub.id,
      },
    });
  };
  const photosUri = images?.[pub?.id]?.map(({uri}) => ({uri}));
  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, async ({assets}) => {
      if (assets[0]) {
        setImages({
          ...images,
          [pub?.id]: [
            ...images?.[pub?.id],
            {uri: assets?.[0].uri, name: assets?.[0].fileName},
          ],
        });
        const reference = storage().ref(pub.name + '/' + assets[0].fileName);
        const firebase = await reference.putFile(assets[0].uri);
        updatePub({
          variables: {
            images: [...pub.images, firebase.metadata.fullPath],
            id: pub.id,
          },
        });
      }
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.white, paddingTop: top}}>
      <StatusBar barStyle={'dark-content'} />
      <View style={style.section}>
        <View style={style.title}>
          <TouchableOpacity
            style={style.back}
            onPress={() => navigation.goBack()}>
            <Icon name={'arrow-left'} size={24} color={theme.dark} />
          </TouchableOpacity>
          <Text style={style.titleText}>Gallery</Text>
        </View>
        {usr.status === user_status.admin &&
          Number(pub?.ownerId) === Number(usr.id) && (
            <TouchableOpacity style={style.back} onPress={onEdit}>
              <Text>{editing ? 'Done' : 'Edit'}</Text>
            </TouchableOpacity>
          )}
      </View>

      <ScrollView contentContainerStyle={style.scrollView}>
        {images &&
          images[pub?.id]?.map((image, i) => (
            <View key={i} style={style.shadow}>
              {editing && images[pub?.id].length > 1 && (
                <TouchableOpacity
                  style={style.deleteIcon}
                  onPress={() => removeImage(image)}>
                  <Icon name={'close'} size={24} color={theme.dark} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  setIndex(i);
                  setVisible(true);
                }}
                style={style.wrapper}>
                <Image
                  source={{uri: image.uri}}
                  style={style.image}
                  resizeMode={'cover'}
                />
              </TouchableOpacity>
            </View>
          ))}
        {editing && (
          <View style={style.shadow}>
            <TouchableOpacity
              onPress={openGallery}
              style={[
                style.wrapper,
                style.image,
                {
                  borderColor: theme.darkGrey,
                  borderWidth: 2,
                  borderRadius: 6,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Icon
                name={'plus'}
                resizeMode={'cover'}
                size={30}
                color={theme.darkGrey}
              />
            </TouchableOpacity>
          </View>
        )}
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
  section: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIcon: {
    backgroundColor: theme.white,
    borderRadius: 30,
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 20,
    padding: 5,
    right: 10,
    top: 10,
  },
  titleText: {fontSize: 34, fontWeight: 'bold'},
});

function arr_diff(a1, a2) {
  var a = [],
    diff = [];

  for (var i = 0; i < a1.length; i++) {
    a[a1[i]] = true;
  }

  for (var i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]];
    } else {
      a[a2[i]] = true;
    }
  }

  for (var k in a) {
    diff.push(k);
  }

  return diff;
}
