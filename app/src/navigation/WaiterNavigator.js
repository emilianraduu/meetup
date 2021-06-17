import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import {GREY_COLOR} from '../helpers/constants';
import {ProfileRoute, TablesRoute} from '../helpers/routes';
import {MyTabBar} from './MyTabBar';
import {ProfileStack} from './profile/ProfileStack';
import WaiterScreen from './main/WaiterScreen';

const Tab = createBottomTabNavigator();

const WaiterNavigator = ({setLoadedNav}) => {
  useEffect(() => {
    setLoadedNav(true);
  }, []);
  return (
    <>
      <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        initialRouteName={TablesRoute}>
        <Tab.Screen
          name={TablesRoute}
          component={WaiterScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name={'appstore1'}
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

export default WaiterNavigator;
