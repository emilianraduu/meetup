import mongoose from 'mongoose'
import {db} from "./config";

mongoose.connect(db.url, {
    useNewUrlParser: true,
    autoIndex: true,
    // loggerLevel: 'info',
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    useFindAndModify: false,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('dbevent: connected')
})
mongoose.connection.on('reconnected', () => {
    console.log('dbevent: reconnected')
})
mongoose.connection.on('error', (err) => {
    console.log(`dbevent: error: ${err}`)
})
mongoose.connection.on('disconnected', () => {
    console.log('dbevent: disconnected')
})
export default mongoose.connection
