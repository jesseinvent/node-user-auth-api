import express, { json } from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import routes from './routes/v1/index.js'
import sanitizer from 'express-mongo-sanitize'
import xss from 'xss-clean'
import morgan from 'morgan'
import cors from 'cors'
import { AppError } from './utils/AppError.js'
import sendSuccessApiResponse from './utils/sendSuccessApiResponse.js'
import connectDatabase from './DB/index.js'

dotenv.config()

// Establish connection to DB
connectDatabase()

const app = express()

app.use(morgan("combined"))

// Express body parsers
app.use(json())

// CORS middleware
app.use(cors())

// MongoDB santizer
app.use(sanitizer())

// xss clean
app.use(xss())

app.use(helmet())

app.get('/', (req, res, next) => {
    return sendSuccessApiResponse(res, {
        statusCode: 200,
        message: "Welcome to User Auth API 😁",
        data : {}
    })
})

app.use('/api/v1', routes)

app.all('*', (req, res, next) => {
    next(
       new AppError(res, 404, 'Invalid Route! 🙄')
    )
})

export default app