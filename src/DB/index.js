import mongoose from 'mongoose'

function getDatabaseURL(environment) {

    switch (environment) {
        case 'production':
            return process.env.DB_PRODUCTION_URL
        case 'development':
            return process.env.DB_DEV_URL
        case 'test':
            return process.env.DB_TEST_URL
        default:
            return process.env.DB_DEV_URL
    }
}

export default () => {
    
    const databaseUrl = getDatabaseURL(process.env.NODE_ENV)

    try {

       mongoose.connect(databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(() => {
            console.log('Connected to DB 😊')
        })
        .catch(err => {
            console.error(err)
        })
        
    } catch (error) {
        console.error(error)
    }
}