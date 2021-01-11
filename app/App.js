import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MapView from 'react-native-maps';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


export const App = () => {
    return (
        <NavigationContainer>

            <Tab.Navigator>
                <Tab.Screen name="Activities" component={HomeScreen}/>
                <Tab.Screen name="Leaderboard" component={SettingsScreen}/>
                <Tab.Screen name="Profile" component={ProfileScreen}/>
            </Tab.Navigator>

        </NavigationContainer>
    );
};


function ProfileScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
          
        </View>
    );
}


function HomeScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Home!</Text>
        </View>
    );
}


function SettingsScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <MapView
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
}

const Tab = createBottomTabNavigator();


