import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthStack} from './auth/AuthStack';
import {connect} from 'react-redux';
import {BattlefieldScreen} from './battlefield/BattlefieldScreen';
import {MyTabBar} from './MyTabBar';
import {LeaderBoardScreen} from './leaderboard/LeaderBoardScreen';
import {ProfileStack} from './profile/ProfileStack';
import {checkPermissions} from '../helpers/actions/PermissionsActions';
import {getUser} from '../helpers/actions/UserActions';
import {AppLoading} from './AppLoading';
import {Text} from 'react-native';

const MainNavigator = ({isLoggedIn, checkPermissions, getUser, loading, permissionArray, navigation}) => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('');
    const loadingOptions = ['The other lad was eventually hit by a train.', 'One of the men told the other that he wants to do that as well',
        'After pointing at the man, he shouted whether he was a kami.'];

    useEffect(() => {
        checkPermissions();
        getUser();
        setLoadingText(loadingOptions[Math.floor(Math.random() * loadingOptions.length)]);
        setProgress(progress => progress + 0.1);
        const interval = setInterval(() => {
            setProgress(progress => progress + 0.1);
        }, 100);
        const textInterval = setInterval(() => {
            setLoadingText(loadingOptions[Math.floor(Math.random() * loadingOptions.length)]);
        }, 3000);
        setTimeout(() => {
            clearInterval(interval);
            clearInterval(textInterval);
        }, 1000);
    }, []);
    useEffect(() => {

    }, [navigation]);
    return (
        <>
            <AppLoading isLoading={loading} progress={progress} text={loadingText}/>
            {
                isLoggedIn ?
                    permissionArray && permissionArray.length > 0 ?
                        <Text>Aici</Text>
                        :
                        <TabNavigator/>
                    :
                    <AuthStack/>}
        </>
    );
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props}/>}
                       tabBarOptions={{
                           activeTintColor: '#B92317',
                           labelStyle: {
                               margin: 0,
                               fontSize: 12,
                               marginTop: 5,
                           },
                           keyboardHidesTabBar: true,
                           style: [{
                               backgroundColor: '#fff',
                               border: 0,
                               borderTopColor: '#fff',
                               borderTopWidth: 0,
                           }],
                       }} initialRouteName={'Settings'}>
            <Tab.Screen name={'Battlefield'} component={BattlefieldScreen}
                        options={{
                            iconOff: require('../assets/animations/battlefield-off.json'),
                            iconOn: require('../assets/animations/battlefield-on.json'),
                        }}/>
            <Tab.Screen name={'Leaderboard'} component={LeaderBoardScreen}
                        options={{
                            iconOff: require('../assets/animations/leaderboard-off.json'),
                            iconOn: require('../assets/animations/leaderboard-on.json'),
                        }}/>
            <Tab.Screen name={'Profile'} component={ProfileStack}
                        options={{
                            iconOff: require('../assets/animations/profile-off.json'),
                            iconOn: require('../assets/animations/profile-on.json'),
                        }}/>
        </Tab.Navigator>
    );
};

export default connect((state) => ({
    permissionArray: state.permissions.permissionArray,
    isLoggedIn: state.user.isLoggedIn,
    loading: state.user.loading,
}), {
    checkPermissions,
    getUser,
})(MainNavigator);
