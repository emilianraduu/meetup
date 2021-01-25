import {GET_USER, GET_USER_FAILED, LOGIN_USER, LOGOUT_USER} from '../actions/UserActions';

const INITIAL_STATE = {
    isLoggedIn: false,
    loading: true,
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_USER_FAILED:
            return {
                ...state,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                isLoggedIn: !!action.payload,
                loading: false,
                user: action.payload,
            };
        case LOGIN_USER:
            return {...state, isLoggedIn: true, user: action.payload};
        case LOGOUT_USER:
            return {...state, isLoggedIn: false};
        default:
            return state;
    }
}
