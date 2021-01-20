import {PERMISSION_ARRAY} from '../actions/PermissionsActions';

const INITIAL_STATE = {
    permissionArray: {},
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case PERMISSION_ARRAY:
            return {
                ...state,
                permissionArray: action.payload,
            };
        default:
            return state;
    }
}
