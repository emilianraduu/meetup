import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import {NotificationsScreen} from './NotificationsScreen';
import {PermissionsScreen} from './PermissionsScreen';
import {PersonalScreen} from './PersonalScreen';

const Stack = createStackNavigator();
export const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="PersonalScreen" component={PersonalScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};
