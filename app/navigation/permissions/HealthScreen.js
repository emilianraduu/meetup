import React, {useEffect} from 'react'
import AppleHealthKit, {HealthValue} from 'react-native-health';
import {View} from 'react-native';

export const HealthScreen = () => {
    useEffect(()=>{
        const permissions = {
            permissions: {
                read: [
                    AppleHealthKit.Constants.Permissions.StepCount,
                ],

            }
        }


        AppleHealthKit.initHealthKit(permissions, (error: string) => {
            /* Called after we receive a response from the system */

            if (error) {
                console.log('[ERROR] Cannot grant permissions!')
            }

            /* Can now read or write to HealthKit */

            const options = {
                startDate: (new Date(2020, 1, 1)).toISOString(),
            }

            AppleHealthKit.getStepCount(options, (callbackError: string, results: HealthValue[]) => {
                console.log(results)
                /* Samples are now collected from HealthKit */
            });
        });
    },[])
    return (
        <View/>
    )
}
