import openSocket from 'socket.io-client/dist/socket.io'
import {Config} from "react-native-config";
import { changeUserDetails } from '../../navigation/authNavigation/LoginActions'
import { updateStage, createStage, updateEvent } from '../../navigation/mainNavigation/tabNavigator/currentStage/Controllers/StagesActions'
import { AsyncStorage } from 'react-native'
import { GET_PREDICTOR_SETTING } from '../../navigation/mainNavigation/profile/ProfileActions'
import {updateStages} from "../../navigation/mainNavigation/tabNavigator/currentStage/Controllers/PredictorActions";
import crashlytics from '@react-native-firebase/crashlytics';

export default class Socket {
    static instance = Socket.instance || new Socket()
    static connection = null
    static isSubscribed = false

    connect() {
        if (!Socket.connection) {
            Socket.connection = openSocket(Config.PREDICTOR_API_URL, {cookie: false, transports: ['websocket']})
            crashlytics().log("Connected to socket")
        } else {
            crashlytics().log("Error: Socket already is connected")
        }
    }

    subscribe({cookie, dispatch}) {
        if (Socket.connection) {
            if (!Socket.isSubscribed) {
                Socket.isSubscribed = true
                Socket.connection.emit('subscribe', {cookie})
                this.setupListeners(dispatch)
            } else {
                crashlytics().log("Error: Already subscribed to socket")
            }
        } else {
            crashlytics().log("Error: Tried to subscribe to socket but connection to socket wasn't made")
        }
    }

    async setupListeners(dispatch) {
        const cookie = await AsyncStorage.getItem('cookie')

        Socket.connection.on('user_update', async (data) => {
            data = JSON.parse(data)
            crashlytics().log("Received user data change event from Socket connection, changing user details on front-end")
            changeUserDetails(data)(dispatch)
        })
        Socket.connection.on('update_super12_settings', async (data) => {
            if (data) {
                crashlytics().log("Received app settings change event from Socket connection, changing predictor settings")
                dispatch({
                    type: GET_PREDICTOR_SETTING,
                    payload: {
                        predictorSettings: data
                    }
                })
            }
        })
        Socket.connection.on('update_etapa', async (data) => {
            if (data) {
                crashlytics().log("Received app settings change event from Socket connection, changing predictor settings")
                updateStage(data)(dispatch)
                updateStages(data)(dispatch)
            }
        })
        Socket.connection.on('create_etapa', async (data) => {
            if (data) {
                crashlytics().log("Received event to create new Stage from Socket connection, creating new Stage on front-end")
                createStage(data)(dispatch)
            }
        })
        Socket.connection.on('update_eveniment', async (data) => {
            if (data) {
                crashlytics().log("Received event to trigger update for an event from Socket connection, updating event on front-end")
                updateEvent(data)(dispatch)
            }
        })

        Socket.connection.on('reconnect', () => {
            this.subscribe({dispatch, cookie})
            crashlytics().log("Reconnected to Socket connection after connection loss")
        })
    }

    async unsubscribe(cookie) {
        if (Socket.connection && Socket.isSubscribed) {
            Socket.connection.emit('unsubscribe', {cookie})
            Socket.isSubscribed = false
            crashlytics().log("Unsubscribed from Socket connection")
        }
    }
}
