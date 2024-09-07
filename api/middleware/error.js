import ErrorHandeler from "../utils/ErrorHandaler.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  console.log("Error =>>>>>>>>", err);

  //   We can Change Error using This importing form Utils
  //   err = new ErrorHandeler(message, 400);

  if (err?.code == "ER_DUP_ENTRY") {
    let message = `User Already Exiest. ${err?.message}`;
    err = new ErrorHandeler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
