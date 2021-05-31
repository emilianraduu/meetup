import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import {LoginRoute, PasswordRoute, WelcomeRoute} from '../helpers/routes';
import PasswordScreen from './PasswordScreen';

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
        name={PasswordRoute}
        component={PasswordScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
