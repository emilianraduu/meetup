import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen} from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import {CameraScreen} from '../permissions/CameraScreen';
import {LocationScreen} from '../permissions/LocationScreen';
import HealthScreen from '../permissions/HealthScreen';


const Stack = createStackNavigator();
export const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="CameraScreen" component={CameraScreen} options={{headerShown: false}}/>
            <Stack.Screen name="LocationScreen" component={LocationScreen} options={{headerShown: false}}/>
            <Stack.Screen name="HealthScreen" component={HealthScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};
