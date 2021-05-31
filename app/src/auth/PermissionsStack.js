import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LocationScreen} from './LocationScreen';
import {NotificationsPermissions} from './NotificationsPermissions';
import {LocationRoute, NotificationRoute} from '../helpers/routes';

const Stack = createStackNavigator();
const PermissionsStack = ({setCheckPerm}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={LocationRoute}
        component={(props) => (
          <LocationScreen {...props} setCheckPerm={setCheckPerm} />
        )}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NotificationRoute}
        component={(props) => (
          <NotificationsPermissions {...props} setCheckPerm={setCheckPerm} />
        )}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default PermissionsStack;
