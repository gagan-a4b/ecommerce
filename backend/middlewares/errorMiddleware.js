const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.error('error:', err);

    res.status(statusCode).json({
        success:false,
        message: err.message || 'Server error',
        stack: process.env.NODE_ENV === 'production'?null:err.stack
    })
};

module.exports = { errorHandler };