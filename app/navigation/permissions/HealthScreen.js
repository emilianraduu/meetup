import React from 'react';
import {Text, View} from 'react-native';
import {DARK_COLOR, GREEN_COLOR} from '../../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Ripple from 'react-native-material-ripple';
import {connect} from 'react-redux';
import {loginUser} from '../../helpers/actions/UserActions';

const HealthScreen = ({loginUser}) => {
    // useEffect(() => {
    //     const permissions = {
    //         permissions: {
    //             read: [
    //                 AppleHealthKit.Constants.Permissions.StepCount,
    //             ],
    //
    //         },
    //     };
    //
    //
    //     AppleHealthKit.initHealthKit(permissions, (error: string) => {
    //         /* Called after we receive a response from the system */
    //
    //         if (error) {
    //             console.log('[ERROR] Cannot grant permissions!');
    //         }
    //
    //         /* Can now read or write to HealthKit */
    //
    //         const options = {
    //             startDate: (new Date(2020, 1, 1)).toISOString(),
    //         };
    //
    //         AppleHealthKit.getStepCount(options, (callbackError: string, results: HealthValue[]) => {
    //             console.log(results);
    //             /* Samples are now collected from HealthKit */
    //         });
    //     });
    // }, []);
    return (
        <View style={{backgroundColor: DARK_COLOR, flex: 1}}>
            <SafeAreaView style={{padding: 20, paddingBottom: 0}}>
                <Text style={{fontSize: 60, color: GREEN_COLOR, fontWeight: 'bold'}}>Health</Text>
            </SafeAreaView>
            <View style={{
                backgroundColor: GREEN_COLOR,
                flex: 1,
                borderTopLeftRadius: 60,
                borderTopRightRadius: 60,
                padding: 20,
                marginLeft: 20,
                marginRight: 20,
            }}>

                <LottieView source={require('../../assets/animations/health.json')} autoPlay loop
                            style={{width: 300, alignSelf: 'center'}}/>
                <SafeAreaView style={{alignSelf: 'flex-end', width: '100%'}}>
                    <Ripple onPress={loginUser} rippleColor={GREEN_COLOR} style={{
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
                        <Text style={{color: '#fff', marginLeft: 10}}>Allow health permissions</Text>
                    </Ripple>

                </SafeAreaView>
            </View>

        </View>
    );
};
export default connect((state) => ({}), {loginUser})(HealthScreen);
