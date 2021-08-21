export default (functionToExecute) => (req, res, next) => {
    functionToExecute(req, res, next).catch(next)
}