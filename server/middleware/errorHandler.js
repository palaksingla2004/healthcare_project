const { constants } = require('../constants'); // coz of multiple key-value pairs(we have to pick one of them),so it is in form of object
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack, // gives the complete path that where is the issue
            });

            break; // break is used for closing server
            case constants.NOT_FOUND:
                res.json({
                    title: "Not Found",
                    message: err.message,
                    stackTrace: err.stack,
                });

                case constants.UNAUTHORIZED:
                    res.json({
                        title: "Unauthorized",
                        message: err.message,
                        stackTrace: err.stack
                    });

                case constants.SERVER_ERROR:
                    res.json({
                        title: "Server Error",
                        message: err.message,
                        stackTrace: err.stack
                    });

                case constants.FORBIDDEN:
                        res.json({
                            title:"Forbidden",
                            message: err.message,
                            stackTrace:err.stack,
                    });
                default:
                    console.log("No error, All Good!!");
                    break;
    }
};

module.exports = errorHandler;