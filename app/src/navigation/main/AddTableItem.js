import {CREATE_MENU_ITEM} from '../../graphql/mutations/Menu';
import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import storage from '@react-native-firebase/storage';
import {client} from '../../graphql';
import {PUB_QUERY} from '../../graphql/queries/Pubs';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {Loader} from '../Loader';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native-elements';
import {theme} from '../../helpers/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddItemModal = ({isVisible, setIsVisible, pub, section}) => {
  const [image, setImage] = useState(undefined);
  const [create, {loading}] = useMutation(CREATE_MENU_ITEM);
  const [values, setValues] = useState({name: '', description: '', price: ''});
  const createMenu = async () => {
    const reference = storage().ref(pub.name + '/' + image.name);
    const firebase = await reference.putFile(image.uri);
    const response = await create({
      variables: {
        image: firebase.metadata.fullPath,
        name: values.name,
        description: values.description,
        sectionId: section.id,
        price: Number(values.price),
      },
    });
    if (response?.data?.createMenuItem) {
      const menuSections = pub.menu.sections;
      const currentSectionIndex = pub.menu?.sections?.findIndex(
        (sec) => sec.id === section.id,
      );
      menuSections[currentSectionIndex].items = menuSections[
        currentSectionIndex
      ].items
        ? [
            ...menuSections[currentSectionIndex].items,
            response?.data?.createMenuItem,
          ]
        : [response?.data?.createMenuItem];

      client.writeQuery({
        query: PUB_QUERY,
        data: {
          pub: {
            ...pub,
            menu: {
              ...pub.menu,
              sections: menuSections,
            },
          },
        },
      });
      setIsVisible(false);
    }
  };
  const onPhotoPress = () => {
    launchImageLibrary({mediaType: 'photo'}, async ({assets}) => {
      if (assets[0]) {
        const name = assets?.[0].fileName;
        const uri = assets?.[0].uri;
        setImage({name, uri});
      }
    });
  };
  const onInputChange = ({key, value}) => {
    setValues({...values, [key]: value});
  };
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection={'down'}
      onBackdropPress={() => setIsVisible(false)}
      propagateSwipe={true}
      onSwipeComplete={() => setIsVisible(false)}>
      <Loader loading={loading} />
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          backgroundColor: theme.white,
          borderRadius: 20,
          shadowOpacity: 0.18,
          shadowRadius: 5.0,
          overflow: 'hidden',
          elevation: 1,
        }}>
        <TouchableOpacity
          onPress={onPhotoPress}
          style={{
            height: 200,
            width: '100%',
            backgroundColor: theme.darkGrey,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {image ? (
            <Image
              source={{uri: image.uri}}
              resizeMode={'cover'}
              style={{flex: 1, height: 200, width: '100%'}}
            />
          ) : (
            <Ionicons color={theme.white} name={'add-circle'} size={50} />
          )}
        </TouchableOpacity>
        <View
          style={{
            padding: 20,
            width: '100%',
          }}>
          <Text style={{fontWeight: 'bold'}}>Item name</Text>
          <TextInput
            style={{
              color: theme.black,
              marginBottom: 20,
            }}
            onChange={({nativeEvent: {text}}) =>
              onInputChange({key: 'name', value: text})
            }
            placeholderTextColor={theme.darkGrey}
            placeholder={'Eg: Carbonara'}
          />
          <Text style={{fontWeight: 'bold'}}>Ingredients</Text>
          <TextInput
            style={{
              color: theme.black,
              marginBottom: 20,
            }}
            value={values.description}
            onChange={({nativeEvent: {text}}) =>
              onInputChange({value: text, key: 'description'})
            }
            placeholderTextColor={theme.darkGrey}
            placeholder={'Ingredients'}
          />
          <Text style={{fontWeight: 'bold'}}>Price</Text>
          <TextInput
            style={{
              color: theme.black,
              marginBottom: 20,
            }}
            value={values.price}
            onChange={({nativeEvent: {text}}) =>
              (Number(text) || text.length < 1) &&
              onInputChange({value: text, key: 'price'})
            }
            placeholderTextColor={theme.darkGrey}
            placeholder={'Ingredients'}
          />
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={createMenu}>
            <Text style={{fontWeight: 'bold', color: theme.red}}>
              Add menu item
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default AddItemModal;
