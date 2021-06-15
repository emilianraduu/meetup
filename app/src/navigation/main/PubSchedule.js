import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {theme, user_status} from '../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useMutation, useReactiveVar} from '@apollo/client';
import {selectedPub, user} from '../../helpers/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CREATE_MENU, CREATE_MENU_SECTION} from '../../graphql/mutations/Pub';
import {Loader} from '../Loader';
import {PUB_QUERY} from '../../graphql/queries/Pubs';
import {client} from '../../graphql';

const PubSchedule = () => {
  const pub = useReactiveVar(selectedPub);
  const {bottom} = useSafeAreaInsets();
  const usr = useReactiveVar(user);

  const [create, {loading, data: menuData, error: menuError}] = useMutation(
    CREATE_MENU,
  );
  const [
    createSection,
    {loading: loadingSection, data: menuSectionData, error: menuSectionError},
  ] = useMutation(CREATE_MENU_SECTION);
  const [sectionText, setSectionText] = useState('');

  const {container, empty} = styles({
    bottom,
  });

  useEffect(() => {
    if (menuError) {
      alert(menuError);
    }
    if (menuData?.createMenu) {
      client.writeQuery({
        query: PUB_QUERY,
        data: {pub: {...pub, menu: menuData?.createMenu}},
      });
    }
  }, [menuData, menuError, pub]);
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
  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <BottomSheetScrollView contentContainerStyle={container}>
        <Loader loading={loading} />
        {!pub?.menu &&
          usr?.status === user_status.admin &&
          Number(pub?.ownerId) === Number(usr.id) && (
            <View>
              <View>
                <Text>You have no menu yet.</Text>
                <Button
                  title={'Create menu'}
                  onPress={() => {
                    create({variables: {id: pub.id}});
                  }}
                />
              </View>
            </View>
          )}
        {pub?.menu?.sections?.map((section) => (
          <View key={section.id}>
            <Text>{section.name}</Text>
            <Ionicons name={section.image} size={20} color={theme.dark} />
            {section.items?.map((item) => (
              <MenuItem item={item} pub={pub} />
            ))}
          </View>
        ))}
        {usr?.status === user_status.admin &&
          Number(pub?.ownerId) === Number(usr.id) && (
            <View>
              <TextInput
                onChange={({nativeEvent: {text}}) => setSectionText(text)}
                placeholder={'Section name'}
              />
              <Button
                title={'Create section'}
                onPress={() => {
                  createSection({
                    variables: {menuId: pub.menu.id, name: sectionText},
                  });
                }}
              />
            </View>
          )}
      </BottomSheetScrollView>
    </View>
  );
};
const MenuItem = ({item, pub}) => {
  return (
    <View>
      <Text> {item.name}</Text>
      <Text> {item.description}</Text>
      <Text>
        {item.price} {pub.currency}
      </Text>
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
export default PubSchedule;
