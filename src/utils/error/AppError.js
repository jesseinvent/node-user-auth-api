import sendErrorApiResponse from "../responses/sendErrorApiResponse.js";

export class AppError extends Error {
  constructor(statusCode, message) {
    super();
    const status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    this.statusCode = statusCode;
    this.message = message;
    this.status = status;
  }
}

export const handleError = (res, err) => {
  const { statusCode, message, status } = err;

  if (!err.statusCode) {
    return sendErrorApiResponse(res, {
      status: "fail",
      statusCode: "500",
      message: "Internal server error 😔",
    });
  }

  return sendErrorApiResponse(res, {
    status,
    statusCode,
    message,
  });
};
