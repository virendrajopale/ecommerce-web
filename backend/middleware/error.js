const ErrorHandler = require("../utils/errorhandler")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500,
        err.message = err.message || "Internal Server Error"

    if (err.name == "CastError") {
        const message = `Resource not found. Invalid ${err.path}`
        err = new ErrorHandler(message, 404)
    }
    // mongoose duplicate error
    if (err.code == 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} enterd`
        err = new ErrorHandler(message, 404)
    }

    // JWT wrong

    if (err.name == "JsonWebTokenError") {
        const message = `Json Token name is invalid, try again`
        err = new ErrorHandler(message, 404)
    }

    // JWT expire Error
    if (err.name == "TokenExpiredError") {
        const message = `Json Token name is expired, try again`
        err = new ErrorHandler(message, 404)
    }


    res.status(err.statusCode).json({
        success: false,
        message: `error: ${err.message}`,
    })
}