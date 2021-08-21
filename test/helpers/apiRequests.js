import request from 'supertest'
import app from '../../src/app.js'

export const makeGetApiRequest = async (uri) => {

    const response = await request(app).get(uri)
    return response
    
}

export const makePostApiRequest = async (uri, data) => {

    const response = await request(app).post(uri)
                            .send(data)
    return response
}


export const makePatchApiRequest = async (uri, data) => {
    
    const response = await request(app).patch(uri)
                            .send(data)
    return response
}


export const makeDeleteApiRequest = async (uri) => {
    
    const response = await request(app).delete(uri)
    return response
}