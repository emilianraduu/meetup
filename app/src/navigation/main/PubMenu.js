import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {theme} from '../../helpers/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import {useReactiveVar} from '@apollo/client';
import {selectedPub} from '../../helpers/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PubMenu = () => {
  const pub = useReactiveVar(selectedPub);
  const {bottom} = useSafeAreaInsets();
  const {container, empty} = styles({
    bottom,
  });
  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <BottomSheetScrollView contentContainerStyle={container}>
        {/*<LottieView*/}
        {/*  source={require('../../assets/animations/empty-stores.json')}*/}
        {/*  loop={true}*/}
        {/*  autoPlay={true}*/}
        {/*  style={empty}*/}
        {/*/>*/}
        {pub?.menu?.sections?.map((section) => (
          <View key={section.id}>
            <Text>{section.name}</Text>
            <Ionicons name={section.image} size={20} color={theme.dark} />
            {section.items?.map((item) => (
              <MenuItem item={item} pub={pub} />
            ))}
          </View>
        ))}
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
export default PubMenu;
