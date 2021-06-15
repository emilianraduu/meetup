import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import {theme, user_status} from '../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useLazyQuery, useMutation, useReactiveVar} from '@apollo/client';
import {refetchPub, selectedPub, user} from '../../helpers/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CREATE_MENU, CREATE_MENU_SECTION} from '../../graphql/mutations/Pub';
import {Loader} from '../Loader';
import {PUB_QUERY} from '../../graphql/queries/Pubs';
import {client} from '../../graphql';
import {
  REMOVE_MENU_ITEM,
  UPDATE_MENU_SECTION,
} from '../../graphql/mutations/Menu';
import storage from '@react-native-firebase/storage';
import AddItemModal from './AddTableItem';

const PubMenu = () => {
  const pub = useReactiveVar(selectedPub);
  const {bottom} = useSafeAreaInsets();
  const usr = useReactiveVar(user);

  const [create, {loading, data: menuData, error: menuError}] = useMutation(
    CREATE_MENU,
  );
  const [
    createSection,
    {data: menuSectionData, error: menuSectionError},
  ] = useMutation(CREATE_MENU_SECTION);
  const [sectionText, setSectionText] = useState('');

  const {container} = styles({
    bottom,
  });

  useEffect(() => {}, [menuData, menuError, pub]);
  useEffect(() => {
    if (menuSectionError) {
      alert(menuSectionError);
    }
    if (menuSectionData?.createMenuSection && pub && pub.menu) {
      if (
        pub.menu.sections &&
        !pub.menu.sections.find(
          (section) => section.id === menuSectionData?.createMenuSection.id,
        )
      ) {
        client.writeQuery({
          query: PUB_QUERY,
          data: {
            pub: {
              ...pub,
              menu: {
                ...pub.menu,
                sections: pub.menu.sections
                  ? [...pub.menu.sections, menuSectionData?.createMenuSection]
                  : [menuSectionData?.createMenuSection],
              },
            },
          },
        });
      }
    }
  }, [menuSectionData, menuSectionError, pub]);
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
  }, []);
  const createSec = async () => {
    try {
      const response = await createSection({
        variables: {menuId: pub.menu.id, name: sectionText},
      });
      if (response?.data?.createMenuSection) {
        setSectionText('');
        client.writeQuery({
          query: PUB_QUERY,
          data: {
            pub: {
              ...pub,
              menu: {
                ...pub.menu,
                sections:
                  pub?.menu?.sections?.length > 0
                    ? [...pub.menu.sections, response?.data?.createMenuSection]
                    : [response?.data?.createMenuSection],
              },
            },
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={container}>
      <BottomSheetScrollView contentContainerStyle={container}>
        <Loader loading={loading} />
        {!pub?.menu &&
          usr?.status === user_status.admin &&
          Number(pub?.ownerId) === Number(usr.id) && (
            <View>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>
                  You have no menu yet.
                </Text>
                <Text style={{color: theme.darkGrey, marginBottom: 20}}>
                  To help your customers find what kind of products you provide
                  it is highly recommended to setup a menu.
                </Text>
                <TouchableOpacity
                  onPress={async () => {
                    const response = await create({variables: {id: pub.id}});
                    if (response?.data?.createMenu) {
                      client.writeQuery({
                        query: PUB_QUERY,
                        data: {
                          pub: {
                            ...pub,
                            menu: response?.data?.createMenu,
                          },
                        },
                      });
                    }
                  }}>
                  <Text
                    style={{
                      color: theme.red,
                      fontWeight: 'bold',
                      marginBottom: 20,
                    }}>
                    Create menu
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        {usr?.status === user_status.admin &&
          Number(pub?.ownerId) === Number(usr.id) &&
          pub?.menu && (
            <>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>
                You can edit and manage the menu anytime.
              </Text>
              <Text style={{color: theme.darkGrey, marginBottom: 20}}>
                It helps your customers into knowing your prices and offers.
              </Text>
            </>
          )}
        {pub?.menu?.sections?.map((section) => (
          <MenuSection
            isAdmin={
              usr?.status === user_status.admin &&
              Number(pub?.ownerId) === Number(usr.id)
            }
            key={section.id}
            section={section}
            pub={pub}
          />
        ))}
        {usr?.status === user_status.admin &&
          Number(pub?.ownerId) === Number(usr.id) &&
          pub?.menu && (
            <KeyboardAvoidingView behavior={'padding'}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>
                  Add a new section.
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    value={sectionText}
                    style={{
                      borderBottomColor: theme.grey,
                      borderBottomWidth: 1,
                      flex: 1,
                    }}
                    onChange={({nativeEvent: {text}}) => setSectionText(text)}
                    placeholderTextColor={theme.darkGrey}
                    placeholder={'Section name'}
                  />
                  <TouchableOpacity
                    title={'Create section'}
                    onPress={createSec}>
                    <Ionicons name={'add-circle'} size={24} />
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          )}
      </BottomSheetScrollView>
    </View>
  );
};
const MenuSection = ({section, pub, isAdmin}) => {
  const [editing, setEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [update] = useMutation(UPDATE_MENU_SECTION);
  const [sectionName, setSectionName] = useState(section.name);
  useEffect(() => {
    if (editing) {
      update({variables: {name: sectionName}});
    }
  }, [editing]);

  return (
    <View style={{marginBottom: 20}}>
      <View
        style={{
          backgroundColor: theme.black,
          borderRadius: 20,
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TextInput
          value={sectionName}
          editable={editing}
          style={{
            flex: 1,
            color: theme.white,
          }}
          onChange={({nativeEvent: {text}}) => setSectionName(text)}
          placeholderTextColor={theme.darkGrey}
          placeholder={'Section name'}
        />
        {isAdmin && (
          <TouchableOpacity
            onPress={() => {
              setEditing(!editing);
            }}>
            <Ionicons
              name={!editing ? 'pencil' : 'checkmark-circle'}
              size={20}
              color={theme.white}
            />
          </TouchableOpacity>
        )}
      </View>
      {section.items?.map((item) => (
        <MenuItem item={item} pub={pub} isAdmin={isAdmin} section={section} />
      ))}
      {isAdmin && (
        <>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}
            onPress={() => setIsVisible(true)}>
            <Text style={{color: theme.red, fontWeight: 'bold'}}>
              Add another item
            </Text>
            <Ionicons
              name={'add-circle'}
              size={20}
              color={theme.red}
              style={{marginLeft: 5}}
            />
          </TouchableOpacity>
          <AddItemModal
            setIsVisible={setIsVisible}
            isVisible={isVisible}
            pub={pub}
            section={section}
          />
        </>
      )}
    </View>
  );
};

const MenuItem = ({item, isAdmin, section}) => {
  const pub = useReactiveVar(selectedPub);
  const [image, setImage] = useState(undefined);
  const [removedItem, setRemovedItem] = useState(undefined);
  const [remove] = useMutation(REMOVE_MENU_ITEM);
  useEffect(() => {
    if (item.image) {
      const getUrl = async () => {
        return await storage().ref(item.image).getDownloadURL();
      };
      getUrl().then((url) => {
        setImage(url);
      });
    }
  }, [item]);
  const removeMenuItem = async () => {
    const response = await remove({variables: {id: item.id}});
    if (response) {
      const menu = pub.menu;
      const index = menu.sections.findIndex((sec) => sec.id === section.id);
      const menuItem = menu.sections[index].items.findIndex(
        (itm) => itm.id === item.id,
      );
      menu.sections[index].items = menu.sections[index].items.splice(
        menuItem,
        1,
      );
      client.writeQuery({
        query: PUB_QUERY,
        data: {
          pub: {...pub, menu},
        },
      });
      setRemovedItem(item);
    }
  };
  return (
    removedItem?.id !== item.id && (
      <View
        style={{
          overflow: 'hidden',
          borderColor: theme.grey,
          borderWidth: 1,
          borderTopWidth: 0,
        }}>
        {isAdmin && (
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Alert Title',
                'My Alert Msg',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: () => removeMenuItem(),
                    style: 'destructive',
                  },
                ],
                {
                  cancelable: false,
                },
              );
            }}
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              zIndex: 20,
              backgroundColor: theme.white,
              borderRadius: 30,
              padding: 5,
            }}>
            <Ionicons name={'trash'} size={22} color={theme.red} />
          </TouchableOpacity>
        )}
        <Image style={{height: 200}} source={{uri: image}} />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            padding: 20,
            backgroundColor: theme.white,
            left: 0,
            right: 0,
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {item.name}
              </Text>
              <Text style={{fontSize: 11, color: theme.darkGrey}}>
                {item.description}
              </Text>
            </View>
            <Text style={{color: theme.red, fontWeight: 'bold'}}>
              {item.price} {pub.currency}
            </Text>
          </View>
        </View>
      </View>
    )
  );
};
const styles = ({bottom}) =>
  StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: theme.white,
      flexGrow: 1,
      paddingBottom: bottom + 30,
    },
    empty: {
      width: Dimensions.get('window').width - 40,
      alignSelf: 'center',
    },
  });
export default PubMenu;
