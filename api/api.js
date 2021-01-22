import {Router} from 'express'
import userRoutes from './routes/user.routes'
import mongoose from "./mongoose";
import authRoutes from './routes/auth.routes'

const api = Router()
mongoose.on('error', console.error.bind(console, 'connection error:'))
mongoose.once('open', function () {
    console.log('mongo is connected!')
})
api.use('/', authRoutes)
api.use('/user', userRoutes)
export default api
