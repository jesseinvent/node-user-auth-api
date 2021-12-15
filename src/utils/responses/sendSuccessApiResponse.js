export default (appResponseObject, res = { message, statusCode, data }) => {
  return appResponseObject.status(res.statusCode).json({
    status: "success",
    message: res.message,
    data: res.data,
  });
};
