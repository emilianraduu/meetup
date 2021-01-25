// import crashlytics from '@react-native-firebase/crashlytics'
import {AsyncStorage} from 'react-native';
import {API_URL} from '../constants';
import Socket from '../store/socket';


export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

export const loginUser = (user) => (dispatch) => {
    dispatch({
        type: LOGIN_USER,
        payload: user,
    });
};
export const LOGOUT_USER = 'LOGOUT_USER';

export const logoutUser = () => (dispatch) => {
    dispatch({
        type: LOGOUT_USER,
    });
};

export const GET_USER = 'GET_USER';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const getUser = () => async (dispatch) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        const response = await fetch(`${API_URL}api/getUser`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            method: 'GET',
        });
        const body = await response.json();
        if (body) {
            Socket.instance.subscribe({token, dispatch});
            dispatch({
                type: GET_USER,
                payload: body,
            });
        }
    } else {
        dispatch({
            type: GET_USER_FAILED,
        });
    }
};
