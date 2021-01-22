import http from 'http'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import api from './api'
import expressValidation from 'express-validation'
import APIError from './helpers/APIError'
import httpStatus from 'http-status'
import compression from 'compression'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './helpers/swagger-spec'
import { configureWs } from './helpers/ws'
import {PORT} from "./config";
import morgan from 'morgan'

let app = express()
app.use(compression())
app.server = http.createServer(app)
configureWs(app.server)
// logger

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())       // to support JSON-encoded bodies
app.use(helmet())
// 3rd party middleware
app.use(cors({
    origin: [
        'http://localhost',
        'http://localhost:8080',
    ],
    credentials: true
}))
// static files
app.use(express.static('public'))
// Swagger API-DOCS
app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(swaggerSpec))

app.use('/api', api)
// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ')
        const error = new APIError(unifiedErrorMessage, err.status, true)
        return next(error)
    } else if (!(err instanceof APIError)) {
        const apiError = new APIError(err.message, err.status, true)
        return next(apiError)
    }
    return next(err)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new APIError('API not found', httpStatus.NOT_FOUND)
    return next(err)
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(err.status).json({
        error_type: httpStatus[err.status],
        errors: {
            default: {
                msg: err.isPublic ? err.message : httpStatus[err.status],
                // stack: err.stack
            }
        }
    })
})

app.server.listen(PORT, () => {
    console.log(`Started on port ${PORT} `)
})

export default app
