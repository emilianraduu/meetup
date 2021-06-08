import {ScrollView, Text, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  AboutRoute,
  MenuRoute,
  ReviewsRoute,
  TableRoute,
} from '../../helpers/routes';
import {TableScreen} from './table/TableScreen';
import ProfileScreen from '../profile/ProfileScreen';
import {ReviewScreen} from '../reviews/ReviewScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {theme} from '../../helpers/constants';
import PubReviews from './PubReviews';
import PubMenu from './PubMenu';
import PubAbout from './PubAbout';

const Tabby = ({isFocused, options, onPress, label, onLongPress}) => {
  const ref = useRef();
  return (
    <TouchableOpacity
      ref={ref}
      onLongPress={onLongPress}
      accessibilityRole="button"
      activeOpacity={0.8}
      accessibilityState={isFocused ? {selected: true} : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={() => onPress(ref)}
      style={[
        {
          borderBottomWidth: 5,
          padding: 15,
          paddingBottom: 5,
          borderColor: 'transparent',
        },
        isFocused && {borderBottomColor: theme.red},
      ]}>
      <Text style={{fontSize: 16, fontWeight: isFocused ? 'bold' : 'normal'}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

function PubTabBar({state, descriptors, navigation, position}) {
  const ref = useRef();
  const [scrollPos, setScrollPos] = useState(0);
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={96}
      style={{
        flexGrow: 0,
        backgroundColor: theme.white,
      }}
      contentContainerStyle={{
        flexDirection: 'row',
        backgroundColor: theme.white,
      }}
      ref={ref}
      onScroll={(event) => {
        setScrollPos(event.nativeEvent);
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = (reff) => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          reff.current.measure((width, height, px, py, fx, fy) => {
            if (
              width + px * 2 >
              scrollPos?.layoutMeasurement?.width + scrollPos?.contentOffset?.x
            ) {
              ref.current.scrollTo({
                x: width + px * 2,
              });
            }
            if (width - px < scrollPos?.layoutMeasurement?.width) {
              ref.current.scrollTo({
                x: width - px,
              });
            }
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Tabby
            key={route.key}
            options={options}
            isFocused={isFocused}
            onLongPress={onLongPress}
            onPress={onPress}
            label={label}
          />
        );
      })}
    </ScrollView>
  );
}

const Tab = createMaterialTopTabNavigator();

function PubTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <PubTabBar {...props} />}>
      <Tab.Screen name={TableRoute} component={TableScreen} />
      <Tab.Screen name={MenuRoute} component={PubMenu} />
      <Tab.Screen name={ReviewsRoute} component={PubReviews} />
      <Tab.Screen name={AboutRoute} component={PubAbout} />
    </Tab.Navigator>
  );
}

export default PubTabs;
