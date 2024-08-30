//not found error

const notFound = (req, res, next) => {
    const error = new Error(`Not Found : ${req.originalUrl}`);
    res.status(404);
    next(error);
};

//Error Handler
const errorHanlder = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        // Mongoose validation error
        return res.status(400).json({
          message: 'Validation Error',
          errors: err.errors,
        });
    }
    
    const statuscode = res.statusCode == 200 ? 500 :res.statusCode;
    res.status(statuscode);
    res.json({
        message:err?.message,
        stack:err?.stack
    });
};

module.exports= { notFound, errorHanlder }