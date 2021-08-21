export default () => {

    const environment = process.env.NODE_ENV
    
    switch (environment) {
        case 'production':
            return process.env.PORT
        case 'development':
            return 3000
        case 'test':
            return 3001
        default:
            return process.env.PORT
    }
}
