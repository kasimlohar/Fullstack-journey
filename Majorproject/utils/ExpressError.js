/**
 * Custom Error Class for Express Applications
 * Extends native Error with status codes and additional context
 */
class ExpressError extends Error {
    constructor(message, statusCode = 500, details = {}) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode;
      this.details = details;
      this.timestamp = new Date().toISOString();
      this.isOperational = true;
  
      // Capture stack trace (excluding constructor call)
      Error.captureStackTrace(this, this.constructor);
    }
  
    // Serialization for API responses
    toJSON() {
      return {
        error: {
          name: this.name,
          message: this.message,
          statusCode: this.statusCode,
          details: this.details,
          timestamp: this.timestamp,
          stack: process.env.NODE_ENV === 'development' ? this.stack : undefined
        }
      };
    }
  }
  
  module.exports = ExpressError;