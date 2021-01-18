import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen} from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import {CameraScreen} from './CameraScreen';
import {LocationScreen} from './LocationScreen';
import HealthScreen from './HealthScreen';
import {NotificationsPermissions} from './NotificationsPermissions';


const Stack = createStackNavigator();
export const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="CameraScreen" component={CameraScreen} options={{headerShown: false}}/>
            <Stack.Screen name="LocationScreen" component={LocationScreen} options={{headerShown: false}}/>
            <Stack.Screen name="NotificationsPermissions" component={NotificationsPermissions} options={{headerShown: false}}/>
            <Stack.Screen name="HealthScreen" component={HealthScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};
