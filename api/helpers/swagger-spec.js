import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'Steppers API',
        version: '1.0.0',
        description: 'Steppers API'
    },
    host: 'localhost',
    servers: [
        {
            url: '/api'
        }
    ],
    components: {
        securitySchemes: {
            basicAuth: {
                type: 'http',
                scheme: 'basic'
            },
            cookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'Cookie'
            }
        }
    },
    security: [{
        cookieAuth: []
    }]
}

let options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/*.js']
}

export const swaggerSpec = swaggerJSDoc(options)
