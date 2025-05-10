const multer = require('multer');

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Handle Multer errors
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message: getMulterErrorMessage(err)
        });
    }

    // Handle other errors
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};

function getMulterErrorMessage(err) {
    switch (err.code) {
        case 'LIMIT_FILE_SIZE':
            return 'File size is too large. Maximum size is 500KB';
        case 'LIMIT_FILE_COUNT':
            return 'Too many files uploaded';
        case 'LIMIT_UNEXPECTED_FILE':
            return 'Invalid file field name';
        default:
            return 'File upload error occurred';
    }
}

module.exports = errorHandler;
