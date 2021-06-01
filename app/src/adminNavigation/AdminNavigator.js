import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainScreen } from './main/MainScreen';
import { ProfileStack } from './profile/ProfileStack';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { GREY_COLOR } from '../helpers/constants';
import { MyTabBar } from './MyTabBar';
import { createStackNavigator } from '@react-navigation/stack';
import PubScreen from './main/PubScreen';
import { GalleryScreen } from './main/GalleryScreen';
import PubContainer from '../contexts/pubContext';
import { ReviewScreen } from './reviews/ReviewScreen';
import { HistoryScreen } from './history/HistoryScreen';
import UserContainer from '../contexts/userContext';
import {
  ExploreRoute,
  GalleryRoute,
  HistoryRoute,
  MainRoute,
  ProfileRoute,
  PubRoute,
  ReviewsRoute,
} from '../helpers/routes';
const Tab = createBottomTabNavigator();

const AdminNavigator = () => {
  return (
    <>
      <PubContainer>
        <UserContainer>
          <Tab.Navigator
            tabBar={(props) => <MyTabBar {...props} />}
            initialRouteName={ExploreRoute}>
            <Tab.Screen
              name={ExploreRoute}
              component={MainStack}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <Icon
                      name={'search1'}
                      style={{ alignSelf: 'center' }}
                      color={focused ? '#d10808' : GREY_COLOR}
                      size={26}
                    />
                  );
                },
              }}
            />
            <Tab.Screen
              name={HistoryRoute}
              component={HistoryScreen}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <Icon
                      name={'book'}
                      style={{ alignSelf: 'center' }}
                      color={focused ? '#d10808' : GREY_COLOR}
                      size={26}
                    />
                  );
                },
              }}
            />
            <Tab.Screen
              name={ReviewsRoute}
              component={ReviewScreen}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <Icon
                      name={'star'}
                      style={{ alignSelf: 'center' }}
                      color={focused ? '#d10808' : GREY_COLOR}
                      size={26}
                    />
                  );
                },
              }}
            />
            <Tab.Screen
              name={ProfileRoute}
              component={ProfileStack}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <Icon
                      name={'user'}
                      style={{ alignSelf: 'center' }}
                      color={focused ? '#d10808' : GREY_COLOR}
                      size={26}
                    />
                  );
                },
              }}
            />
          </Tab.Navigator>
        </UserContainer>
      </PubContainer>
    </>
  );
};

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={MainScreen} name={MainRoute} />
        <Stack.Screen name={PubRoute} component={PubScreen} />
        <Stack.Screen name={GalleryRoute} component={GalleryScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AdminNavigator;
