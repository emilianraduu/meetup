import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainScreen} from './main/MainScreen';
import {ProfileStack} from './profile/ProfileStack';
import {AppLoading} from './AppLoading';
import {AsyncStorage, StatusBar, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {GREY_COLOR, user_status} from '../helpers/constants';
import {MyTabBar} from './MyTabBar';
import {createStackNavigator} from '@react-navigation/stack';
import PubScreen from './main/PubScreen';
import {GalleryScreen} from './main/GalleryScreen';
import {ReviewScreen} from './reviews/ReviewScreen';
import {HistoryScreen} from './history/HistoryScreen';
import {AuthStack} from '../auth/AuthStack';
import {
  ExploreRoute,
  GalleryRoute,
  HistoryRoute,
  MainRoute,
  ProfileRoute,
  PubRoute,
  ReviewsRoute,
} from '../helpers/routes';
import {isLoggedIn, user} from '../helpers/variables';
import {useQuery, useReactiveVar} from '@apollo/client';
import {ME_QUERY} from '../graphql/queries/User';
import PermissionsStack from '../auth/PermissionsStack';
import AdminNavigator from './AdminNavigator';

const MainNavigator = ({setLoadedNav}) => {
  const [progress] = useState(0);
  const [permissions, setPermissions] = useState(undefined);
  const [checkPerm, setCheckPerm] = useState(true);
  const usr = useReactiveVar(user);
  const isLogged = useReactiveVar(isLoggedIn);
  const {loading, data, error} = useQuery(ME_QUERY, {fetchPolicy: 'no-cache'});

  useEffect(() => {
    if (checkPerm) {
      const getPerms = async () => {
        const location = await AsyncStorage.getItem('locationPerm');
        const notification = await AsyncStorage.getItem('notificationPerm');
        return [location, notification];
      };
      getPerms().then((perms) => {
        setPermissions(perms);
        setCheckPerm(false);
      });
    }
  }, [checkPerm]);

  useEffect(() => {
    if (data?.me) {
      isLoggedIn(true);
      user(data.me);
    }
    if (error) {
    }
  }, [data, error]);

  useEffect(() => {
    setLoadedNav(true);
  }, []);
  const renderNav = () => {
    switch (usr?.status) {
      case user_status.admin:
        return <AdminNavigator />;
      case user_status.client:
        return <TabNavigator />;
      case user_status.waiter:
        return <TabNavigator />;
    }
  };
  return (
    <>
      <AppLoading isLoading={loading} progress={progress} />
      {isLogged ? (
        permissions?.some((el) => !el) ? (
          <PermissionsStack setCheckPerm={setCheckPerm} />
        ) : (
          renderNav()
        )
      ) : (
        <AuthStack />
      )}
    </>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <>
      <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        initialRouteName={ExploreRoute}>
        <Tab.Screen
          name={ExploreRoute}
          component={MainStack}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name={'search1'}
                  style={{alignSelf: 'center'}}
                  color={focused ? '#d10808' : GREY_COLOR}
                  size={26}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={HistoryRoute}
          component={HistoryScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name={'book'}
                  style={{alignSelf: 'center'}}
                  color={focused ? '#d10808' : GREY_COLOR}
                  size={26}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={ReviewsRoute}
          component={ReviewScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name={'star'}
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

const MainStack = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={MainScreen} name={MainRoute} />
        <Stack.Screen name={PubRoute} component={PubScreen} />
        <Stack.Screen name={GalleryRoute} component={GalleryScreen} />
      </Stack.Navigator>
    </>
  );
};

export default MainNavigator;
