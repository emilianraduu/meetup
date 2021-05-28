import {
  Animated,
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../helpers/constants';

const Sheet = ({children, pub}) => {
  const [index, setIndex] = useState(0);
  const [animation] = useState(new Animated.Value(0));
  const {top} = useSafeArea();
  const bottomSheetRef = useRef();

  const onClose = () => {
    bottomSheetRef.current.snapTo(0);
  };
  const animate = useCallback(
    (i) => {
      Animated.timing(animation, {
        toValue: i === 1 ? top : 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    },
    [animation, top],
  );

  const handleSheetChanges = useCallback(
    (i: number) => {
      setIndex(i);
      animate(i);
    },
    [animate],
  );
  return (
    <BottomSheet
      handleComponent={null}
      ref={bottomSheetRef}
      index={0}
      onChange={handleSheetChanges}
      snapPoints={['68%', '100%']}>
      <BottomSheetScrollView focusHook={useFocusEffect}>
        <Animated.View
          style={{
            flex: 1,
            transform: [{translateY: animation}],
            paddingTop: 33,
          }}>
          <TopBar index={index} onClose={onClose} pub={pub} />
          {children}
        </Animated.View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const TopBar = ({onClose, pub, index}) => {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

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
    setExpanded(index === 1);
  }, [index]);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}>
      <Animated.View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}>
        {expanded && (
          <View style={{flexGrow: expanded ? 1 : 0}}>
            <TouchableOpacity
              onPress={onClose}
              style={{alignSelf: 'flex-start'}}>
              <Icon name={'arrow-back'} size={20} color={theme.black} />
            </TouchableOpacity>
          </View>
        )}
        <Text
          style={{
            fontWeight: '500',
            fontSize: 20,
            color: theme.black,
            flexGrow: expanded ? 1 : 0,
          }}>
          {pub.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: theme.black,
            marginLeft: expanded ? 0 : 26,
          }}>
          Reset
        </Text>
      </Animated.View>
    </View>
  );
};
export default Sheet;
