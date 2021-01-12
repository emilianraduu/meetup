import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen} from './WelcomeScreen';
import {LoginScreen} from './LoginScreen';


const Stack = createStackNavigator();
export const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};
