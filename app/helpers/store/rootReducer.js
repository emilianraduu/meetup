import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import UserReducer from '../reducers/UserReducer';
import {persistReducer} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import PermissionsReducer from '../reducers/PermissionsReducer';

const configUser = {
    key: 'user',
    storage: AsyncStorage,
};
const UserPersist = persistReducer(configUser, UserReducer);


const appReducer = combineReducers({
    form: formReducer,
    user: UserPersist,
    permissions: PermissionsReducer,
});
const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
