const errorHandlingMiddleware = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        let messages = {};
        Object.keys(err.errors).forEach((key) => {
            messages[key] = err.errors[key].message;
        });
        res.status(400).json({
            success: false,
            message: 'Validation error',
            data: messages,
        });
    } else {
        next(err);
    }
}


module.exports = errorHandlingMiddleware;