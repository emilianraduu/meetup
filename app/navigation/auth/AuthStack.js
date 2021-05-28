import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import {CameraScreen} from './CameraScreen';
import {LocationScreen} from './LocationScreen';
import {NotificationsPermissions} from './NotificationsPermissions';
import {
  CameraRoute,
  EnterpriseLoginRoute,
  LocationRoute,
  LoginRoute,
  ManagerRoute,
  NotificationRoute,
  WaiterRoute,
  WelcomeRoute,
} from '../../helpers/routes';
import EnterpriseLoginScreen from './EnterpriseLoginScreen';
import ManagerScreen from './ManagerScreen';
import WaiterScreen from './WaiterScreen';

const Stack = createStackNavigator();
export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={WelcomeRoute}
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={LoginRoute}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={EnterpriseLoginRoute}
        component={EnterpriseLoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={WaiterRoute}
        component={WaiterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ManagerRoute}
        component={ManagerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={CameraRoute}
        component={CameraScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={LocationRoute}
        component={LocationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NotificationRoute}
        component={NotificationsPermissions}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
