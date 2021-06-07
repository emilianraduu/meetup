import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import {NotificationsScreen} from './NotificationsScreen';
import {PermissionsScreen} from './PermissionsScreen';
import {PersonalScreen} from './PersonalScreen';
import {
  PermissionsRoute,
  PersonalRoute,
  ProfileNotificationsRoute,
  ProfileRoute,
  SiriRoute,
} from '../../helpers/routes';
import SiriScreen from './SiriScreen';

const Stack = createStackNavigator();
export const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ProfileRoute}
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ProfileNotificationsRoute}
        component={NotificationsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SiriRoute}
        component={SiriScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={PermissionsRoute}
        component={PermissionsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={PersonalRoute}
        component={PersonalScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
