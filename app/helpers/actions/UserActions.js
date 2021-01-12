// import crashlytics from '@react-native-firebase/crashlytics'

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

export const loginUser = () => (dispatch) => {
    dispatch({
        type: LOGIN_USER,
    });
};
export const LOGOUT_USER = 'LOGOUT_USER';

export const logoutUser = () => (dispatch) => {
    dispatch({
        type: LOGOUT_USER,
    });
};
