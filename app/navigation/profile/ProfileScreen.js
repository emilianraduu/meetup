import {Text, View} from 'react-native';
import React from 'react'
import Ripple from 'react-native-material-ripple';
import {GREEN_COLOR} from '../../helpers/constants';
import {connect} from 'react-redux'
import {logoutUser} from '../../helpers/actions/UserActions';

const ProfileScreen = ({logoutUser}) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Ripple onPress={logoutUser} rippleColor={GREEN_COLOR} style={{
                borderRadius: 5,
                width: 250,
                height: 50,
                marginBottom: 10,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                overflow: 'hidden',
                alignSelf: 'center',
            }}>
                <Text style={{color: '#000', marginLeft: 10}}>Logout</Text>
            </Ripple>
        </View>
    );
};
export default connect((state)=>({}),{logoutUser})(ProfileScreen)
