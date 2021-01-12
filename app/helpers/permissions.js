import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';


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
    return true
};
export const checkPermissions = async () => {
    const alwaysLocation = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);


    const iosCamera = await check(PERMISSIONS.IOS.CAMERA);


    const locationInUse = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    return checkPermission(locationInUse) && checkPermission(iosCamera) && checkPermission(alwaysLocation);


};


export const get = () =>{ }
