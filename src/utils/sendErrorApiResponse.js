
export default (appResponseObject, res = { statusCode, status, message }) => {

    return appResponseObject
                .status(res.statusCode)
                .send({ 
                    status: res.status, 
                    message: res.message,
                    data: {}
                })

}