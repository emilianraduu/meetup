import {LOGIN_USER, LOGOUT_USER} from '../actions/UserActions';

const INITIAL_STATE = {
    isLoggedIn: false,
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, isLoggedIn: true};
        case LOGOUT_USER:
            return {...state, isLoggedIn: false};
        default:
            return state;
    }
}
