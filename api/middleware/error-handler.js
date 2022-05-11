const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later'
    }

    if(err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(', ')
        customError.statusCode = 404
    }

    if(err.code === 11000){
        customError.msg = `Duplication Error: ${Object.keys(
            err.keyValue
            )}, please provide anohther value`
        customError.statusCode = 400
    }

    if(err.name === 'CastError'){
        customError.msg = `No item found with id: ${err.value}`;
        customError.statusCode = 404;
    }

    return res.status(customError.statusCode).json({msg: customError.msg})
    // res.json(err)
}

module.exports = errorHandlerMiddleware;