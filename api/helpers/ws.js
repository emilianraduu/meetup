import socketio from 'socket.io'
import socketioRedisAdapter from 'socket.io-redis'
import redisClient from './redisClient'

export const configureWs = (server) => {
    const io = socketio(server, { cookie: false, transports: ['websocket'] })
    const pubClient = redisClient
    const subClient = pubClient.duplicate()
    let adapter = socketioRedisAdapter({ pubClient, subClient })
    // adapter.pubClient.on('error', function(){});
    // adapter.subClient.on('error', function(){});
    io.adapter(adapter)
    io.on('connect', onConnect)
}

function onConnect (socket) {
}
