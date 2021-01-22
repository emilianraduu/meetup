import socketioEmiter from 'socket.io-emitter'
import redisClient from './redisClient'

const emitter = socketioEmiter(redisClient)
emitter.redis.on('error', () => {
    console.log('emitter error')
})
export default emitter
