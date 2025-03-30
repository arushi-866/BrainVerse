export const errorHandler = (err, req, res, next) => {
    console.error('🚨 Error:', err.stack);
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({
      success: false,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };
  
  // Add to server.js
  import { errorHandler } from './middleware/error.js';
  app.use(errorHandler);