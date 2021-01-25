import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

export const PERMISSION_ARRAY = 'PERMISSION_ARRAY';

const checkPermission = (result) => {
    switch (result) {
        case RESULTS.UNAVAILABLE:
            // console.log('This feature is not available (on this device / in this context)');
            return false;
        case RESULTS.DENIED:
            // console.log('The permission has not been requested / is denied but requestable');
            return false;
        case RESULTS.LIMITED:
            // console.log('The permission is limited: some actions are possible');
            return false;
        case RESULTS.GRANTED:
            // console.log('The permission is granted');
            break;
        case RESULTS.BLOCKED:
            // console.log('The permission is denied and not requestable anymore');
            return false;
    }
    return true;
};

export const PERMISSION_ARRAY_START = 'PERMISSION_ARRAY_START';
export const checkPermissions = () => async (dispatch) => {
    const alwaysLocation = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
    const notificationPermission = await messaging().hasPermission();
    const iosCamera = await check(PERMISSIONS.IOS.CAMERA);
    const locationInUse = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    dispatch(
        {
            type: PERMISSION_ARRAY,
            payload: {
                LocationScreen: !checkPermission(locationInUse),
                CameraScreen: !checkPermission(iosCamera),
                LocationScreenAlways: !checkPermission(alwaysLocation),
                NotificationsScreen: !notificationPermission,
            },
        },
    );


};


