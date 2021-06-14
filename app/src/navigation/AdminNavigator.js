import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {GREY_COLOR} from '../helpers/constants';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AddPubRoute,
  GalleryRoute,
  MainAdminRoute,
  MyPubsRoute,
  ProfileRoute,
  PubRoute,
} from '../helpers/routes';
import {MyTabBar} from './MyTabBar';
import {ProfileStack} from './profile/ProfileStack';
import PubScreen from './main/PubScreen';
import {GalleryScreen} from './main/GalleryScreen';
import MyPubsScreen from './myPubs/MyPubs';
import AddPubScreen from './myPubs/AddPubScreen';

const Tab = createBottomTabNavigator();

const AdminNavigator = () => {
  return (
    <>
      <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        initialRouteName={MyPubsRoute}>
        <Tab.Screen
          name={MyPubsRoute}
          component={AdminStack}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name={'home'}
                  style={{alignSelf: 'center'}}
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
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name={'user'}
                  style={{alignSelf: 'center'}}
                  color={focused ? '#d10808' : GREY_COLOR}
                  size={26}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={MyPubsScreen} name={MainAdminRoute} />
        <Stack.Screen name={AddPubRoute} component={AddPubScreen} />
        <Stack.Screen name={PubRoute} component={PubScreen} />
        <Stack.Screen name={GalleryRoute} component={GalleryScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AdminNavigator;
